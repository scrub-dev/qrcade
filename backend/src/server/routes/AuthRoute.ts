
import { AuthState } from '@lib/auth/states.js'
import { Log, LogType } from '@lib/logging/log.js'
import { login, register } from '@server/controllers/AuthController.js'
import { IUser } from '@src/models/user.js'
import express, { Request, Response } from 'express'
import passport from 'passport'
import { Model } from 'sequelize'
export const router = express.Router()



router.get("/test", (_, res: Response) => {
    res.json({"Time": new Date(Date.now()).toUTCString(), message: "HELLOWORLD"}).end()
})

router.post('/login', async (req: Request, res: Response) => {
    passport.authenticate('auth', async (err: Error | null, user: IUser | boolean, info: {message: string, state: AuthState}) => {
        login(err, user, info, req, res)
    })(req,res)
})

router.post("/register", (req, res) => {
    passport.authenticate('register', {session: false}, async (err: Error | null, user: IUser, info: {message: string, state: AuthState}) => {
        register(err, user, info, req, res)
    })(req, res)
})