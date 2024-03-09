
import express, { Request, Response } from 'express'
import UserAuthorisationHandler from '../handlers/UserAuthorisationHandler.js'
import { hit } from '../controllers/HitController.js'
import AuthorisationHandler from '../handlers/AuthorisationHandler.js'
export const router = express.Router()

router.get("/test", (req: Request, res: Response) => {
        console.log(req)
})

router.post("/:hitid", AuthorisationHandler, hit)