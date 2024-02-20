import { AuthState } from '@lib/auth/states.js'
import { Log, LogType } from '@lib/logging/log.js'
import JsonResponse from '@server/responses/JsonResponse.js'
import { Request, Response } from 'express'
import { Model } from 'sequelize'





export const register = (error: Error | null, user: Model, info: {state: AuthState}, req: Request, res: Response) => {
}

export const login = (err: Error | null, user: Model, info: {state: AuthState}, req: Request, res: Response) => {

    console.log(err, user, info, "TEST")
    if(err) return Log(err.message, LogType.ERROR)

    req.logIn(user, {session: false}, async (error: Error) => {
    })
}