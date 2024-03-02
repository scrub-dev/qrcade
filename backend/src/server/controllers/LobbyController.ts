import getGamemodes from "@src/lib/lobby/getGamemodes.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { GameCode, GeneralCode, ResponseCode } from "../responses/DefaultResponse.js"
import { getAllLobbies, getLobbyByID, getLobbyByName } from "@src/lib/models/lobby/getLobby.js"
import {default as createNewLobby } from '@lib/models/lobby/createLobby.js'
import { sequelize } from "@src/lib/database/database.js"
import getLobbyInformation from "@src/lib/lobby/getLobbyInformation.js"

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
        lobby.GameInfo = getLobbyInformation(lobby.LobbyType)
        return new JsonResponse(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Lobby info found`, data: lobby}}).send()
    }
}