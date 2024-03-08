
import express, { Request, Response } from 'express'
import passport from 'passport'
import UserAuthorisationHandler from '../handlers/UserAuthorisationHandler.js'
import { hit } from '../controllers/HitController.js'
export const router = express.Router()

router.get("/test", (req: Request, res: Response) => {
        console.log(req)
})

router.post("hit/:hitid", UserAuthorisationHandler, hit)