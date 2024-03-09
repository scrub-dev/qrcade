
import { AuthState } from '@lib/auth/states.js'
import { login, logout, register } from '@server/controllers/AuthController.js'
import { IUser } from '@src/models/user.js'
import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import UserAuthorisationHandler from '../handlers/UserAuthorisationHandler.js'
import AuthorisationHandler from '../handlers/AuthorisationHandler.js'
export const router = express.Router()


// router.get("/test", passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
//         console.log(req)
// })

router.get("/test/:username", UserAuthorisationHandler, (req: Request , res: Response) => {
    console.log(req.params)
    res.send("HELLO WORLD")
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

router.delete("/logout", AuthorisationHandler, logout)