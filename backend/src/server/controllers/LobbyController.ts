import getGamemodes from "@src/lib/lobby/getGamemodes.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { GeneralCode, ResponseCode } from "../responses/DefaultResponse.js"
import { getAllLobbies, getLobbyByID, getLobbyByName, getLobbyUsers } from "@src/lib/models/lobby/get/getLobby.js"
import {default as createNewLobby } from '@src/lib/models/lobby/create/createLobby.js'
import { sequelize } from "@src/lib/database/database.js"
import getLobbyInformation from "@src/lib/lobby/getLobbyInformation.js"
import removeUsersFromLobby from "@src/lib/lobby/removeUsersFromLobby.js"
import { getUserByID } from "@src/lib/models/user/getUser.js"
import { IUser } from "@src/models/user.js"
import { getTeamsInLobby } from "@src/lib/models/lobby/get/getTeam.js"
import { create } from "domain"

export const getLobbyTypes = (req: Request, res: Response) => {
    let values = getGamemodes()

    if(values.length <= 0) return JsonResponse.NoResults(res).send()

    return new JsonResponse(res, {
        statusCode: ResponseCode.SUCCESS,
        contents: {
            code: GeneralCode.SUCCESS,
            message: `Valid gamemods found: ${values.length}`,
            data: values
        }
    }).send()
}

export const createLobby = async (req: Request, res: Response) => {
    const existingLobby = (await getLobbyByName(req.body.LobbyName))
    if(existingLobby) return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.DUPLICATE, message: "A lobby with this name already exists"}}).send()

    let lobbyType = req.body.LobbyType
    let allowedLobbyTypes = getGamemodes()

    if(!allowedLobbyTypes.map(type => type.name).includes(lobbyType)) return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_FOUND, message: "Invalid Lobby Type"}}).send()

    await createNewLobby({LobbyName: req.body.LobbyName, LobbyType: req.body.LobbyType})
    return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: "New lobby created"}}).send()
}

export const listLobbies = async (req: Request, res: Response) => {
    let lobbies = (await getAllLobbies())
    lobbies = lobbies.map(e => e.dataValues)

    if(lobbies.length <= 0) return JsonResponse.NoResults(res).send()
    else return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Lobbies found: ${lobbies.length}`, data: lobbies}}).send()
}

export const getLobbyInfo = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res).send()
    else {
        let [userList, userCount] = await getLobbyUsers(lobby.LobbyID)
        lobby.GameInfo = {...getLobbyInformation(lobby.LobbyType)}
        lobby.Participants = {count: userCount, players: userList}
        return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Lobby info found`, data: lobby}}).send()
    }
}

export const deleteLobby = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res).send()

    await sequelize.models.Lobbies.destroy({where: {LobbyID: req.params.lobbyid}})
    await removeUsersFromLobby(req.params.lobbyid)

    return JsonResponse.Deleted(res, "Lobby").send()
}

export const getLobbyFlags = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res).send()
}

export const getLobbyTeams = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res, lobby).send()

    let teams = (await getTeamsInLobby(lobby.LobbyID)).map(e => e.dataValues)
    if(teams.length <= 0) return JsonResponse.NoResults(res).send()

    return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Teams found: ${teams.length}`, data: teams}}).send()
}

export const getLobbyPlayers = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res).send()

    let [users,userCount] = (await getLobbyUsers(lobby.LobbyID))
    if((userCount as number) <= 0) return JsonResponse.NoResults(res).send()
    else return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Players found: ${userCount}`, data: users}}).send()
}


export const joinLobby = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res, "lobby").send()

    let user = (await getUserByID(req.params.userid)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res, "user").send()

    await sequelize.models.Users.update({LobbyID: lobby.LobbyID}, {where: {UserID: user.UserID}})

    return JsonResponse.UserJoinedLobby(res).send()
}

export const leaveLobby = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues

    if(!lobby) return JsonResponse.NotFound(res, "lobby").send()

    let user = (await getUserByID(req.params.userid)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res, "user").send()

    await sequelize.models.Users.update({LobbyID: null, TeamID: null}, {where: {UserID: req.params.userid}})

    return JsonResponse.UserLeftLobby(res).send()
}


export const lobbyParamHandler = async (req: Request, res: Response) => {
    let param = req.params.param.toUpperCase()
    let lobby = req.params.lobbyid
    let method = req.method.toUpperCase()

    let lobbyData = (await getLobbyByID(lobby))?.dataValues
    if(!lobbyData) return JsonResponse.NotFound(res, "lobby").send()

    switch(param){
        default: return JsonResponse.FieldNotSupported(res).send()
        case "FLAG":
            if(method == "PATCH"){
                createFlag(req,res)
            }
            else if(method == "DELETE"){
                deleteFlag(req,res)
            }
        case "TEAM":
            if(method == "PATCH"){
                createTeam(req,res)
            }
            else if(method == "DELETE"){
                deleteTeam(req,res)
            }
    }
}


export const isValidLobby = async(lobbyID: string) => {
    let lobby = (await getLobbyByID(lobbyID))?.dataValues
    return lobby ? true : false
}

export const createFlag = async (req: Request, res: Response) => {
}
export const deleteFlag = async (req: Request, res: Response) => {
}

export const createTeam = async (req: Request, res: Response) => {
}
export const deleteTeam = async (req: Request, res: Response) => {

}

export const joinTeam = async (req: Request, res: Response) => {
    // let team = (await getTeamByID(req.params.teamid))?.dataValues
    // if(!team) return JsonResponse.NotFound(res, "team").send()

    // let user = (await getUserByID(req.params.userid)) as unknown as IUser
    // if(!user) return JsonResponse.NotFound(res, "user").send()

    // await sequelize.models.Users.update({TeamID: team.TeamID}, {where: {UserID: user.UserID}})

    // return JsonResponse.UserJoinedTeam(res).send()
}
export const leaveTeam = async (req: Request, res: Response) => {
    // let team = (await getTeamByID(req.params.teamid))?.dataValues
    // if(!team) return JsonResponse.NotFound(res, "team").send()

    // let user = (await getUserByID(req.params.userid)) as unknown as IUser
    // if(!user) return JsonResponse.NotFound(res, "user").send()

    // await sequelize.models.Users.update({TeamID: null}, {where: {UserID: user.UserID}})

    // return JsonResponse.UserLeftTeam(res).send()
}