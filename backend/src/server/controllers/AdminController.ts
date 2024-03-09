import { sequelize } from "@src/lib/database/database.js"
import { getUserByID } from "@src/lib/models/user/getUser.js"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse.js"
import { IUser } from "@src/models/user.js"
import hashPassword from "@src/lib/user/hashPassword.js"
import { clearUserHits as clearAUsersHits } from "@src/lib/models/hit/delete/clearHits.js"

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

export const clearAllHits = async (req: Request, res: Response) => {}
export const clearUserHits = async (req: Request, res: Response) => {}
export const clearLobbyHits = async (req: Request, res: Response) => {}
export const clearTeamHits = async (req: Request, res: Response) => {}

//#endregion