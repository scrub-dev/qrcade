import { sequelize } from "@src/lib/database/database"
import { getUserByID } from "@src/lib/models/user/getUser"
import { Request, Response } from "express"
import JsonResponse from "../responses/JsonResponse"
import { IUser } from "@src/models/user"
import hashPassword from "@src/lib/user/hashPassword"

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
    await sequelize.models.Users.destroy({where: {UserID: req.params.userid}})
}

export const add = async (req: Request, res: Response)  => {
    let paramToReset = req.params.param.toUpperCase()
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()
}

export const remove = async (req: Request, res: Response) => {
    let paramToReset = req.params.param.toUpperCase()
    let userID = req.params.userid

    let user = (await getUserByID(userID)) as unknown as IUser
    if(!user) return JsonResponse.NotFound(res).send()
}


const resetDisplayName = async (userID: string, newDisplayName: string) => {
    (await sequelize.models.Users.update({DisplayName: newDisplayName}, {where: {UserID : userID}}))
}
const resetPassword = async (userID: string, newPassword: string) => {
    (await sequelize.models.Users.update({Passwd: hashPassword(newPassword)}, {where: {UserID : userID}}))
}

const addAdmin = (userID : string) => {}
const removeAdmin = (userID : string) => {}