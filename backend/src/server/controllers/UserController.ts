import { AuthState } from '@lib/auth/states.js'
import { IUser } from '@src/models/user.js'
import { Request, Response } from 'express'
import JsonResponse from '../responses/JsonResponse.js'
import { sequelize } from '@src/lib/database/database.js'
import { getUserByID, getUserByUsername } from '@src/lib/models/user/getUser.js'
import hashPassword from '@src/lib/user/hashPassword.js'

type TUpdateParams = {
    userid: string,
    field: string,
    newValue: string
}

export const update = (req: Request, res: Response) => {

    const params = req.params as TUpdateParams
    const newValue = req.body.password || req.body.username || req.body.displayname

    switch(params.field.toUpperCase()) {
        default:
            return JsonResponse.FieldNotSupported(res)
        case "PASSWORD":
            updatePassword(params.userid, newValue)
            return JsonResponse.FieldUpdated(res, "PASSWORD")
        case "DISPLAYNAME":
            updateDisplayName(params.userid, newValue)
            return JsonResponse.FieldUpdated(res, "DISPLAYNAME")
        case "USERNAME":
            updateUsername(params.userid, newValue)
            return JsonResponse.FieldUpdated(res, "USERNAME")
    }
}

const updatePassword = async (userID: string, newPassword: string) => {
    const res = (await sequelize.models.Users.update({Passwd: hashPassword(newPassword)}, {
        where: { UserID: (await getUserByID(userID))}
    }))
}

const updateDisplayName = async (userID: string, newDisplayName: string) => {
    const res = (await sequelize.models.Users.update({DisplayName: newDisplayName}, {
        where: { UserID: (await getUserByID(userID))}
    }))
}

const updateUsername = async (userID: string, newUsername: string) => {
    const res = (await sequelize.models.Users.update({Username: newUsername}, {
        where: { UserID: (await getUserByID(userID))}
    }))
}
