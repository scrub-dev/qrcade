import { AuthState } from '@lib/auth/states.js'
import { IUser } from '@src/models/user.js'
import { Request, Response } from 'express'
import JsonResponse from '../responses/JsonResponse.js'

type TUpdateParams = {
    username: string,
    field: string,
    newValue: string
}

export const update = (req: Request, res: Response) => {

    const params = req.params as TUpdateParams

    switch(params.field.toUpperCase()) {
        default:
            return JsonResponse.FieldNotSupported(res)

        case "PASSWORD":
            updatePassword(params.username, params.newValue)
            return JsonResponse.FieldNotSupported(res)

        case "USERNAME":

            return JsonResponse.FieldNotSupported(res)

    }
}

const updatePassword = (user: string, newPassword: string) => {
}
const updateUsername = (user: string, newUsername: string) => {

}