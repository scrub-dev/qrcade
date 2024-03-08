import { IUser } from "@src/models/user";
import { Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse";
import { getLobbyByID } from "@src/lib/models/lobby/get/getLobby";
import { getUserByID } from "@src/lib/models/user/getUser";
import { getFlagByID } from "@src/lib/models/lobby/get/getFlag";

const enum HIT {
    USER, FLAG
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
    if (lobbyID === null) return JsonResponse.NotFound(res, `Lobby invalid or not in a lobby`).send()
    if (lobbyType === null) return JsonResponse.InvalidType(res).send()

    let func: Function | undefined = undefined

    switch (lobbyType) {
        case LOBBY.SHOOTER_FFA: func = SHOOTER_FFA_RegisterHit; break;
        case LOBBY.SHOOTER_TDM: func = SHOOTER_TDM_RegisterHit; break;
        case LOBBY.LOOTER_FFA:  func = LOOTER_FFA_RegisterHit ; break;
        default: func = undefined; break;
    }

    if (func === undefined) return JsonResponse.InvalidType(res).send()
    else return await func({
        res: res,
        scanner: user,
        scannedID: hitID,
        scannedType: hitType,
        lobbyID: lobbyID,
        lobbyType: lobbyType
    })
}

//#region Parsers
const userParser = (req: Request) => {
    const user = req.body.user
    if(!user) return null

    return user as IUser
}

const hitTypeParser = (req: Request) => {
    const hitID = req.params.hitid
    const hitType = hitID.split("_")[0].toUpperCase()

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
        case "SHOOTER_TDM":
        case "LOOTER_FFA":
            return [lobby.LobbyType.toUpperCase() as LOBBY, lobby.LobbyID] as [LOBBY, string]
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
    if(scannedUser === null) return JsonResponse.NotFound(values.res, `Flag not found`).send()

    if(values.scanner.LobbyID !== scannedUser.LobbyID) return JsonResponse.DifferentLobby(values.res).send()
    if(values.scanner.UserID === scannedUser.UserID) return JsonResponse.SamePlayer(values.res).send()

    let [error, message] = await addPlayerHit(values.scanner, scannedUser)
}

const SHOOTER_TDM_RegisterHit = async (values: IHitRegisterValues) => {
    if(values.scannedType == HIT.FLAG) return JsonResponse.InvalidScanType(values.res, `You can't scan Flags in this gamemode`).send()

    let scannedUser = await getUserByID(values.scannedID) as any
    if(scannedUser === null) return JsonResponse.NotFound(values.res, `Flag not found`).send()

    if(values.scanner.LobbyID !== scannedUser.LobbyID) return JsonResponse.DifferentLobby(values.res).send()
    if(values.scanner.TeamID === scannedUser.TeamID) return JsonResponse.SameTeam(values.res).send()
    if(values.scanner.UserID === scannedUser.UserID) return JsonResponse.SamePlayer(values.res).send()

    let [error, message] = await addPlayerHit(values.scanner, scannedUser)
}
const LOOTER_FFA_RegisterHit = async (values: IHitRegisterValues) => {
    if(values.scannedType == HIT.USER) return JsonResponse.InvalidScanType(values.res, `You can't scan Users in this gamemode`).send()

    let scannedFlag = await getFlagByID(values.scannedID)
    if(scannedFlag === null) return JsonResponse.NotFound(values.res, `Flag not found`).send()

    if(values.scanner.LobbyID !== scannedFlag.LobbyID) return JsonResponse.DifferentLobby(values.res).send()

    // the scanned is a flag
    // they are both in the same lobby

    // TODO
    // - check if the flag is already scanned


}
//#endregion
//#region Helper functions


const addFlagHit = async (scanner: IUser, flag: any): Promise<[boolean, string]> => {

    // check for duplicate flag hits

    return [false, ""]
}

const addPlayerHit = async (scanner: IUser, player: any): Promise<[boolean, string]> => {

    const threshold = 5

    // check for double intant-scans w/ threshold

    return [false, ""]
}


//#endregion