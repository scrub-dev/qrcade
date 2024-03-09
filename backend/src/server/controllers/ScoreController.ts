import { getLobbyByID, getLobbyUsers } from "@src/lib/models/lobby/get/getLobby.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { getTeamsInLobby } from "@src/lib/models/lobby/get/getTeam.js"
import { IUser } from "@src/models/user.js"
import { getHitsByPlayer, getHitsByTeam, getHitsToPlayer } from "@src/lib/models/hit/get/getScore.js"
import { GeneralCode, ResponseCode } from "../responses/DefaultResponse.js"

export const getLobbyScores = async (req: Request, res: Response) => {

    let lobby = await getLobbyByID(req.params.lobbyid) as any
    if(!lobby) return JsonResponse.NotFound(res, "Lobby not found").send()

    switch(lobby.LobbyType){
        case "SHOOTER_FFA":
            return new JsonResponse(res, {contents: {code: GeneralCode.SUCCESS, message: "SCORES_SENT", data: await SHOOTER_FFAScore(req.params.lobbyid)}, statusCode: ResponseCode.SUCCESS}).send()
            break
        case "SHOOTER_TDM":
            return new JsonResponse(res, {contents: {code: GeneralCode.SUCCESS, message: "SCORES_SENT", data: await SHOOTER_TDMScore(req.params.lobbyid)}, statusCode: ResponseCode.SUCCESS}).send()
            break
        case "LOOTER_FFA":
            return new JsonResponse(res, {contents: {code: GeneralCode.SUCCESS, message: "SCORES_SENT", data: await LOOTER_FFAScore(req.params.lobbyid)}, statusCode: ResponseCode.SUCCESS}).send()
        default:
            return JsonResponse.InvalidType(res).send()
    }
}

const SHOOTER_FFAScore = async (lobbyID: string) => {
    let dataObject = {LobbyType: "SHOOTER_FFA",Players: []}
        dataObject = await addPlayersToDataObject(lobbyID, dataObject)
    return dataObject
}
const SHOOTER_TDMScore = async (lobbyID: string) => {
    let dataObject = {LobbyType: "SHOOTER_TDM" , Teams: [], Players: []}
    dataObject = await addTeamsToDataObject(lobbyID, dataObject)
    dataObject = await addPlayersToDataObject(lobbyID, dataObject)
    return dataObject

}
const LOOTER_FFAScore =  async (lobbyID: string) => {
    let dataObject = {LobbyType: "LOOTER_FFA", Players: []}
    dataObject = await addPlayersToDataObject(lobbyID, dataObject)
    return dataObject
}

const addTeamsToDataObject = async (lobbyID: string, dataObject: any) => {
    let teams = (await getTeamsInLobby(lobbyID))
    dataObject.Teams = await Promise.all(teams.map(async (team: any) => ({
        teamID: team.TeamID,
        teamName: team.TeamName,
        teamColour: team.TeamColour,
        teamScore:  (await getHitsByTeam(team.TeamID)).length
    })))
    return dataObject
}

const addPlayersToDataObject = async (lobbyID: string, dataObject: any) => {
    let [players, _] = (await getLobbyUsers(lobbyID))
    dataObject.Players =  await Promise.all((players as IUser[]).map(async (player: any) => ({
        playerID: player.UserID,
        playerName: player.DisplayName,
        teamID: player.TeamID,
        hitsGiven: (await getHitsByPlayer(player.UserID)).length,
        hitsTaken: (await getHitsToPlayer(player.UserID)).length
    })))
    return dataObject
}