import { IUser } from "@src/models/user.js";
import { Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse.js";
import { getLobbyByID } from "@src/lib/models/lobby/get/getLobby.js";
import { getUserByID } from "@src/lib/models/user/getUser.js";
import { getFlagByID } from "@src/lib/models/lobby/get/getFlag.js";
import { getUsersLastHitTime, isFlagDuplicate } from "@src/lib/models/hit/get/getHit.js";
import { createLOOTER_FFAHit, createSHOOTER_FFAHit, createSHOOTER_TDMHit } from "@src/lib/models/hit/create/createHits.js";
import { GameCode, ResponseCode } from "../responses/DefaultResponse.js";
import sanitiseUser from "@src/lib/user/sanitiseUser.js";

const enum HIT {
    USER,
    FLAG
}
const enum LOBBY {
    SHOOTER_FFA, SHOOTER_TDM, LOOTER_FFA
}

export const hit = async (req: Request, res: Response) => {
    let user : IUser | null = userParser(req)
    let [hitType, hitID]: [HIT | null, string] = hitTypeParser(req)

    if(user === null) return JsonResponse.NotFound(res, `User not found`).send()
    if(hitType === null) return JsonResponse.InvalidType(res).send()

    let [lobbyType, lobbyID] = await lobbyTypeParser(user.LobbyID)
    if (lobbyID === null || lobbyID === undefined) return JsonResponse.NotFound(res, `Lobby invalid or not in a lobby`).send()
    if (lobbyType === null) return JsonResponse.InvalidType(res).send()

    let values: IHitRegisterValues = {
            res: res,
            scanner: user,
            scannedID: hitID,
            scannedType: hitType,
            lobbyID: lobbyID,
            lobbyType: lobbyType
        }

    switch (lobbyType) {
        case LOBBY.SHOOTER_FFA:
            return await SHOOTER_FFA_RegisterHit(values)
        case LOBBY.SHOOTER_TDM:
            return await SHOOTER_TDM_RegisterHit(values)
        case LOBBY.LOOTER_FFA:
            return await LOOTER_FFA_RegisterHit(values)
        default:
            return JsonResponse.InvalidType(res).send()
    }
}

//#region Parsers
const userParser = (req: Request) => {
    const user = req.body.user
    if(!user) return null

    return user as IUser
}

const hitTypeParser = (req: Request) => {
    const hitID = req.params.hitid
    const hitType = hitID.split("-")[0].toUpperCase()

    switch(hitType){
        case "USER":
            return [HIT.USER, hitID] as [HIT, string]
        case "FLAG":
            return [HIT.FLAG, hitID] as [HIT, string]
        default:
            return [null, hitID] as [null, string]
    }
}

const lobbyTypeParser = async (lobbyID: any) => {
    const lobby = (await getLobbyByID(lobbyID)) as any
    if(!lobby) return [null, null] as [null, null]

    switch(lobby.LobbyType.toUpperCase()){
        case "SHOOTER_FFA":
            return [LOBBY.SHOOTER_FFA, lobby.LobbyID] as [LOBBY, string]
        case "SHOOTER_TDM":
            return [LOBBY.SHOOTER_TDM, lobby.LobbyID] as [LOBBY, string]
        case "LOOTER_FFA":
            return [LOBBY.LOOTER_FFA, lobby.LobbyID] as [LOBBY, string]
        default:
            return [null, lobby.LobbyID] as [null, string]
    }
}
//#endregion

//#region Hit Registers
interface IHitRegisterValues {
    res: Response
    scanner: IUser,
    scannedID: string,
    scannedType: HIT,
    lobbyID: string,
    lobbyType: LOBBY
}

const SHOOTER_FFA_RegisterHit = async (values: IHitRegisterValues) => {
    if(values.scannedType == HIT.FLAG) return JsonResponse.InvalidScanType(values.res, `You can't scan Flags in this gamemode`).send()

    let scannedUser = await getUserByID(values.scannedID) as any
    if(!scannedUser || scannedUser === null) return JsonResponse.ScannedUserDoesNotExist(values.res).send()
    if(!scannedUser.LobbyID || scannedUser.LobbyID === null) return JsonResponse.ScannedUserNotInLobby(values.res).send()

    if(values.scanner.LobbyID !== scannedUser.LobbyID) return JsonResponse.DifferentLobby(values.res).send()
    if(values.scanner.UserID === scannedUser.UserID) return JsonResponse.SamePlayer(values.res).send()

    let [error, message] = await addPlayerHit(values.scanner, scannedUser)
    if(error) return JsonResponse.SomethingWentWrong(values.res, message).send()

    return new JsonResponse(values.res,{
        statusCode: ResponseCode.SUCCESS,
        contents: {message: `Valid Hit`, code: GameCode.VALID_HIT, data: sanitiseUser(scannedUser)}
    }).send()
}

const SHOOTER_TDM_RegisterHit = async (values: IHitRegisterValues) => {
    if(values.scannedType == HIT.FLAG) return JsonResponse.InvalidScanType(values.res, `You can't scan Flags in this gamemode`).send()

    let scannedUser = await getUserByID(values.scannedID) as unknown as IUser
    if(!scannedUser || scannedUser === undefined) return JsonResponse.ScannedUserDoesNotExist(values.res).send()
    if(!scannedUser.LobbyID || scannedUser.LobbyID === null) return JsonResponse.ScannedUserNotInLobby(values.res).send()

    if(values.scanner.LobbyID !== scannedUser.LobbyID) return JsonResponse.DifferentLobby(values.res).send()
    if(values.scanner.TeamID === scannedUser.TeamID) return JsonResponse.SameTeam(values.res).send()
    if(values.scanner.UserID === scannedUser.UserID) return JsonResponse.SamePlayer(values.res).send()
    if(!scannedUser.TeamID) return JsonResponse.ScannedUserNotInTeam(values.res).send()

    let [error, message] = await addPlayerHit(values.scanner, scannedUser, values.scanner.TeamID)
    if(error) return JsonResponse.SomethingWentWrong(values.res, message).send()

    return new JsonResponse(values.res,{
        statusCode: ResponseCode.SUCCESS,
        contents: {message: `Valid Hit`, code: GameCode.VALID_HIT, data: sanitiseUser(scannedUser)}
    }).send()

}
const LOOTER_FFA_RegisterHit = async (values: IHitRegisterValues) => {
    if(values.scannedType == HIT.USER) return JsonResponse.InvalidScanType(values.res, `You can't scan Users in this gamemode`).send()

    let scannedFlag = await getFlagByID(values.scannedID)
    if(scannedFlag === null) return JsonResponse.NotFound(values.res, `Flag not found`).send()

    if(values.scanner.LobbyID !== scannedFlag.LobbyID) return JsonResponse.DifferentLobby(values.res).send()

    let [error, message] = await addFlagHit(values.scanner, values.scannedID)
    if(error) return JsonResponse.SomethingWentWrong(values.res, message).send()

    let response = new JsonResponse(values.res,{
        statusCode: ResponseCode.SUCCESS,
        contents: {message: `Valid Hit`, code: GameCode.VALID_HIT, data: scannedFlag}
    })
    return response.send()
}
//#endregion
//#region Helper functions


const addFlagHit = async (scanner: IUser, flag: any): Promise<[boolean, string]> => {
    if(await isFlagDuplicate(scanner.UserID, flag.FlagID)) return [true, "INVALID_DUPLICATE"]

    createLOOTER_FFAHit({
        scanner: scanner.UserID,
        flag: flag.FlagID,
        lobby: scanner.LobbyID as string
    })
    return [false, ""]
}

const addPlayerHit = async (scanner: IUser, player: any, team?: string): Promise<[boolean, string]> => {
    const threshold = 3

    let lastHit = await getUsersLastHitTime(scanner.UserID)
    if(lastHit){
        let lastHitTime = new Date(lastHit).getTime()
        let thresholdTime = new Date(lastHitTime + (threshold * 1000)).getTime()
        let currentTime = new Date(Date.now()).getTime()
        if(currentTime <= thresholdTime) return [true, "INVALID_TOO_SOON"]
    }

    if(team){
        createSHOOTER_TDMHit({
            scanner: scanner.UserID,
            scanned: player.UserID,
            lobby: scanner.LobbyID as string,
            team: team
        })
    }else{
        createSHOOTER_FFAHit({
            scanner: scanner.UserID,
            scanned: player.UserID,
            lobby: scanner.LobbyID as string
        })
    }
    return [false, ""]
}


//#endregion