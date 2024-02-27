import express from 'express'
import UserAuthorisationHandler from '../handlers/UserAuthorisationHandler.js'
import { getUserInformation, update } from '../controllers/UserController.js'
import AuthorisationHandler from '../handlers/AuthorisationHandler.js'
export const router = express.Router()


router.get("/test", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString()}).end()
})

router.patch("/:userid/update/:field", UserAuthorisationHandler, update)
router.get("/:userid/:filter", AuthorisationHandler, getUserInformation)
router.get("/:userid", AuthorisationHandler, getUserInformation)
