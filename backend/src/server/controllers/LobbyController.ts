import getGamemodes from "@src/lib/lobby/getGamemodes.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { GeneralCode, ResponseCode } from "../responses/DefaultResponse.js"
import { getAllLobbies, getLobbyByID, getLobbyByName, getLobbyUsers, getTeamUsers } from "@src/lib/models/lobby/get/getLobby.js"
import {default as createNewLobby } from '@src/lib/models/lobby/create/createLobby.js'
import { sequelize } from "@src/lib/database/database.js"
import getLobbyInformation from "@src/lib/lobby/getLobbyInformation.js"
import removeUsersFromLobby from "@src/lib/lobby/removeUsersFromLobby.js"
import { getUserByID } from "@src/lib/models/user/getUser.js"
import { IUser } from "@src/models/user.js"
import { getTeamByID, getTeamsInLobby } from "@src/lib/models/lobby/get/getTeam.js"
import { default as createLobbyTeam } from "@src/lib/models/lobby/create/createTeam.js"
import { default as createLobbyFlag } from "@src/lib/models/lobby/create/createFlag.js"
import { getLobbyFlags as getFlags } from "@src/lib/models/lobby/get/getFlag.js"

import { deleteTeam as deleteLobbyTeam, deleteLobbyTeams } from "@src/lib/models/lobby/delete/deleteTeam.js"
import { deleteFlags, deleteFlag as deleteLobbyFlag } from "@src/lib/models/lobby/delete/deleteFlag.js"

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
    await deleteLobbyTeams(req.params.lobbyid)
    await deleteFlags(req.params.lobbyid)

    return JsonResponse.Deleted(res, "Lobby").send()
}

export const getLobbyFlags = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res).send()

    let flags = (await getFlags(lobby.LobbyID)).map(e => e.dataValues)
    if(flags.length <= 0) return JsonResponse.NoResults(res).send()

    return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Flags found: ${flags.length}`, data: flags}}).send()
}

export const getLobbyTeams = async (req: Request, res: Response) => {
    let lobby = (await getLobbyByID(req.params.lobbyid))?.dataValues
    if(!lobby) return JsonResponse.NotFound(res, lobby).send()

    let teams = (await getTeamsInLobby(lobby.LobbyID)).map(e => e.dataValues)
    if(teams.length <= 0) return JsonResponse.NoResults(res).send()

    return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Teams found: ${teams.length}`, data: teams}}).send()
}

export const getLobbyTeam = async (req: Request, res: Response) => {
    let team = (await getTeamByID(req.params.teamid))?.dataValues
    if(!team) return JsonResponse.NotFound(res, "team").send()

    return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Team Found`, data: team}}).send()
}

export const getTeamPlayers = async (req: Request, res: Response) => {
    let team = (await getTeamByID(req.params.teamid))?.dataValues
    if(!team) return JsonResponse.NotFound(res, "team").send()

    let [users, userCount] = await getTeamUsers(team.TeamID)
    if((userCount as number) <= 0) return JsonResponse.NoResults(res).send()
    else return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Players found: ${userCount}`, data: users}}).send()
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
                return createFlag(req,res)
            }
            else if(method == "DELETE"){
                return deleteFlag(req,res)
            }
            return JsonResponse.FieldNotSupported(res).send()
        case "TEAM":
            if(method == "PATCH"){
                return createTeam(req,res)
            }
            else if(method == "DELETE"){
                return deleteTeam(req,res)
            }
            return JsonResponse.FieldNotSupported(res).send()
    }
}


export const isValidLobby = async(lobbyID: string) => {
    let lobby = (await getLobbyByID(lobbyID))?.dataValues
    return lobby ? true : false
}

export const createFlag = async (req: Request, res: Response) => {
    let lobbyID = req.params.lobbyid
    let flagName = req.body.flagName
    let flagInfo = req.body.flagInfo
    let flagDesc = req.body.flagDesc

    if(!isValidLobby(lobbyID)) return JsonResponse.NotFound(res, "lobby").send()

    await createLobbyFlag({
        flagName: flagName,
        flagInfo: flagInfo,
        flagDesc: flagDesc,
        lobbyID: lobbyID
    })
    return JsonResponse.Created(res, "Flag").send()
}
export const deleteFlag = async (req: Request, res: Response) => {
    let flag = req.params.paramid
    let lobby = req.params.lobbyid

    if(!isValidLobby(lobby)) return JsonResponse.NotFound(res, "lobby").send()
    await deleteLobbyFlag(flag)
    return JsonResponse.Deleted(res, "Flag").send()
}

export const createTeam = async (req: Request, res: Response) => {
    let teamName = req.body.teamName
    let teamColour = req.body.teamColour
    let lobby = req.params.lobbyid

    if(!isValidLobby(lobby)) return JsonResponse.NotFound(res, "lobby").send()
    await createLobbyTeam(teamName, teamColour, lobby)
    return JsonResponse.Created(res, "Team").send()
}
export const deleteTeam = async (req: Request, res: Response) => {

    let team = req.params.paramid
    let lobby = req.params.lobbyid

    if(!isValidLobby(lobby)) return JsonResponse.NotFound(res, "lobby").send()
    await deleteLobbyTeam(team)
    return JsonResponse.Deleted(res, "Team").send()
}

export const joinTeam = async (req: Request, res: Response) => {

    let teamID = req.params.teamid
    let userID = req.params.userid

    if(teamID == undefined || userID == undefined) return JsonResponse.MissingFields(res).send()

    let team = (await getTeamByID(teamID))?.dataValues
    if(!team) return JsonResponse.NotFound(res, "team").send()

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res, "user").send()

    await sequelize.models.Users.update({TeamID: team.TeamID}, {where: {UserID: user.UserID}})

    return JsonResponse.UserJoinedTeam(res).send()
}
export const leaveTeam = async (req: Request, res: Response) => {
    let teamID = req.params.teamid
    let userID = req.params.userid

    if(teamID == undefined || userID == undefined) return JsonResponse.MissingFields(res).send()

    let team = (await getTeamByID(teamID))?.dataValues
    if(!team) return JsonResponse.NotFound(res, "team").send()

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res, "user").send()

    await sequelize.models.Users.update({TeamID: null}, {where: {UserID: user.UserID}})

    return JsonResponse.UserLeftTeam(res).send()
}