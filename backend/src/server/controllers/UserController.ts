import { AuthState } from '@lib/auth/states.js'
import { IUser } from '@src/models/user.js'
import { Request, Response } from 'express'
import JsonResponse from '../responses/JsonResponse.js'
import { sequelize } from '@src/lib/database/database.js'
import { getUserByID, getUserByUsername } from '@src/lib/models/user/getUser.js'
import hashPassword from '@src/lib/user/hashPassword.js'
import { GeneralCode, ResponseCode } from '../responses/DefaultResponse.js'
import sanitiseUser from '@src/lib/user/sanitiseUser.js'

type TUpdateParams = {
    userid: string,
    field: string,
    newValue: string
}

export const update = (req: Request, res: Response) => {

    const params = req.params as TUpdateParams
    const newValue = req.body.newValue

    switch(params.field.toUpperCase()) {
        default:
            return JsonResponse.FieldNotSupported(res).send()
        case "PASSWORD":
            updatePassword(params.userid, newValue)
            return JsonResponse.FieldUpdated(res, "PASSWORD").send()
        case "DISPLAYNAME":
            updateDisplayName(params.userid, newValue)
            return JsonResponse.FieldUpdated(res, "DISPLAYNAME").send()
        // case "USERNAME":
        //     updateUsername(params.userid, newValue)
        //     return JsonResponse.FieldUpdated(res, "USERNAME").send()
    }
}

const updatePassword = async (userID: string, newPassword: string) => {
    // const res = (await sequelize.models.Users.update({Passwd: hashPassword(newPassword)}, {
    //     where: { UserID: (await getUserByID(userID))}
    // }))
    (await sequelize.models.Users.update({Passwd: hashPassword(newPassword)}, {where: {UserID : userID}}))

}

const updateDisplayName = async (userID: string, newDisplayName: string) => {
    // let user = (await getUserByID(userID))
    // await user.update({DisplayName: newDisplayName})
    // await user.save()
    (await sequelize.models.Users.update({DisplayName: newDisplayName}, {where: {UserID : userID}}))
}

const updateUsername = async (userID: string, newUsername: string) => {
}

export const getUserInformation = async (req: Request, res: Response) => {
    let filter = (req.params.filter || undefined) as string

    let user = (await getUserByID(req.params.userid)) as unknown as IUser

    user = sanitiseUser(user) as IUser

    if(!user) return JsonResponse.NotFound(res).send()
    if(!filter) return new JsonResponse(res, {contents: {message: "User data", code: GeneralCode.SUCCESS, data: user}, statusCode: ResponseCode.SUCCESS}).send()

    let data = {}

    switch(filter.toUpperCase()) {
        default:
            data = {...user}
            break
        case "LOBBY":
            data = {lobby: user.LobbyId , team: user.TeamId}
            break
        case "DISPLAYNAME":
            data = {DisplayName: user.DisplayName}
            break
        case "ADMIN":
            data = {admin: user.Admin}
            break
    }
    return new JsonResponse(res, {contents: {message: `User data (FILTER: ${filter})`, code: GeneralCode.SUCCESS, data: data}, statusCode: ResponseCode.SUCCESS}).send()
}
