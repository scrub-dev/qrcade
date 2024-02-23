import { AuthState } from '@lib/auth/states.js'
import { Log, LogType } from '@lib/logging/log.js'
import { AuthCode, GeneralCode, ResponseCode } from '@server/responses/DefaultResponse.js'
import JsonResponse from '@server/responses/JsonResponse.js'
import getAuthSecret from '@src/lib/auth/getAuthSecret.js'
import sanitiseUser from '@src/lib/user/sanitiseUser.js'
import { IUser } from '@src/models/user.js'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'


const genericErrorResponse = (err: Error, res: Response) => {
    Log(err.message, LogType.ERROR)
    return new JsonResponse(res, {
        statusCode: ResponseCode.SERVER_ERROR,
        contents: {
            message: "An error occured, if you are a server admin, please check the logs for more information.",
            code: GeneralCode.GENERAL_FAILURE
        }
    }).send()
}


export const register = (err: Error | null, user: IUser, info: {state: AuthState, message: string}, req: Request, res: Response) => {
    if(err) return genericErrorResponse(err, res)
    if(info.state == AuthState.FAILED_EXISTING_USER) {
        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "Username already used.",
                code: AuthCode.UNAME_DUPLICATE
            }
        }).send()
    }
    if(info.state == AuthState.SUCCESS_REGISTER){
        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "User Created",
                code: AuthCode.REGISTER_SUCCESS
            }
        }).send()
    }

    return genericErrorResponse(new Error(`General Failure: ${info.message}`), res)
}

export const login = (err: Error | null, user: IUser | boolean, info: {state: AuthState}, req: Request, res: Response) => {
    if(err) return genericErrorResponse(err, res)
    if(info.state == AuthState.FAILED_WRONG_PASSWORD || info.state == AuthState.FAILED_NO_USER){
        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "Username or Password is incorrect, please try again!",
                code: AuthCode.FAIL
            }
        }).send()
    }

    if(info.state == AuthState.MISSING_PWORD) {
        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "Password field missing!",
                code: AuthCode.FAIL
            }
        }).send()
    }

    if(info.state == AuthState.MISSING_UNAME) {
        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "Username field missing!",
                code: AuthCode.FAIL
            }
        }).send()
    }

    req.logIn(user, {session: false}, async (error: Error) => {
        if(error) return genericErrorResponse(error, res)

        user = user as IUser
        const authSecret = getAuthSecret()
        if(!authSecret) throw new Error("Missing Auth Secret, check getAuthSecret()")

        const body = {_id: user.UserID, _DisplayName: user.DisplayName, _Username: user.Username}
        const token = jwt.sign({user: body}, authSecret, {expiresIn: '365d'})

        return new JsonResponse(res, {
            statusCode: ResponseCode.SUCCESS,
            contents: {
                message: "Logged in",
                code: AuthCode.SUCCESS,
                token: token,
                userState: {...sanitiseUser(user)}
                }
            }
        ).send()
    })
}