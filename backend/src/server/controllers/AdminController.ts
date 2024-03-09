import { sequelize } from "@src/lib/database/database.js"
import { getUserByID } from "@src/lib/models/user/getUser.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { IUser } from "@src/models/user.js"
import hashPassword from "@src/lib/user/hashPassword.js"

import  {
            clearUserHits as clearAUsersHits,
            clearAllHits as clearHits,
            clearLobbyHits as clearAllLobbyHits,
            clearTeamHits as clearAllTeamHits
        }
        from "@src/lib/models/hit/delete/clearHits.js"
import { getLobbyByID } from "@src/lib/models/lobby/get/getLobby.js"
import { getTeamByID } from "@src/lib/models/lobby/get/getTeam.js"

export const reset = async (req: Request, res: Response) => {
    let paramToReset = req.params.param.toUpperCase()
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()

    switch(paramToReset){
        default:
            return JsonResponse.FieldNotSupported(res).send()
        case "DISPLAYNAME":
            resetDisplayName(userID, user.Username)
            return JsonResponse.FieldUpdated(res, "displayname").send()
        case "PASSWORD":
            resetPassword(userID, user.Username)
            return JsonResponse.FieldUpdated(res, "password").send()
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    let user = (await getUserByID(req.params.userid)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()
    await clearAUsersHits(user.UserID)
    await sequelize.models.Users.destroy({where: {UserID: req.params.userid}})
    return JsonResponse.Deleted(res).send()
}

export const add = async (req: Request, res: Response)  => {
    let paramToReset = req.params.param.toUpperCase()
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()

    switch(paramToReset) {
        default:
            return JsonResponse.FieldNotSupported(res).send()
        case "ADMIN":
            addAdmin(req.params.userid)
            return JsonResponse.FieldUpdated(res, "admin").send()
    }
}

export const remove = async (req: Request, res: Response) => {
    let paramToReset = req.params.param.toUpperCase()
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()

    switch(paramToReset) {
        default:
            return JsonResponse.FieldNotSupported(res).send()
        case "ADMIN":
            removeAdmin(req.params.userid)
            return JsonResponse.FieldUpdated(res, "admin").send()
    }
}

const resetDisplayName = async (userID: string, newDisplayName: string) => {
    (await sequelize.models.Users.update({DisplayName: newDisplayName}, {where: {UserID : userID}}))
}
const resetPassword = async (userID: string, newPassword: string) => {
    (await sequelize.models.Users.update({Passwd: hashPassword(newPassword)}, {where: {UserID : userID}}))
}

const addAdmin = async (userID : string) => {
    (await sequelize.models.Users.update({Admin: true}, {where: {UserID : userID}}))
}
const removeAdmin = async (userID : string) => {
    (await sequelize.models.Users.update({Admin: false}, {where: {UserID : userID}}))
}

//#region Hit Management

export const clearAllHits = async (req: Request, res: Response) => {
    await clearHits()
    return JsonResponse.Deleted(res, `All Hits`).send()
}
export const clearUserHits = async (req: Request, res: Response) => {
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()

    await clearAUsersHits(userID)
    return JsonResponse.Deleted(res, `All Hits for ${user.Username}`).send()
}
export const clearLobbyHits = async (req: Request, res: Response) => {
    let lobbyID = req.params.lobbyid

    let lobby = await getLobbyByID(lobbyID) as any
    if(!lobby) return JsonResponse.NotFound(res).send()

    await clearAllLobbyHits(lobbyID)
    return JsonResponse.Deleted(res, `All Hits for Lobby ${lobby.LobbyName}`).send()
}
export const clearTeamHits = async (req: Request, res: Response) => {
    let teamID = req.params.teamid

    let team = await getTeamByID(teamID) as any
    if(!team) return JsonResponse.NotFound(res).send()

    await clearAllTeamHits(teamID)
    return JsonResponse.Deleted(res, `All Hits for Team ${team.TeamName}`).send()
}

//#endregion