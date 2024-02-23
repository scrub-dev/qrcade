import express from 'express'
import UserAuthorisationHandler from '../handlers/UserAuthorisationHandler.js'
import { update } from '../controllers/UserController.js'
export const router = express.Router()

router.get("/test", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString()}).end()
})


router.patch("/:userid/update/:field/:newValue", UserAuthorisationHandler, update)