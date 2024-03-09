import express, {Request, Response} from "express"
import AdminAuthorisationHandler from "../handlers/AdminAuthorisationHandler.js"
import JsonResponse from "../responses/JsonResponse.js"
import { add, deleteUser, remove, reset } from "../controllers/AdminController.js"

export const router = express.Router()

router.get("/test", AdminAuthorisationHandler ,(req: Request , res: Response) => {
    return JsonResponse.Test(res).send()
})

router.patch('/add/:userid/:param', AdminAuthorisationHandler, add)
router.patch('/remove/:userid/:param', AdminAuthorisationHandler, remove)
router.patch('/reset/:userid/:param', AdminAuthorisationHandler, reset)
router.delete('/delete/:userid', AdminAuthorisationHandler, deleteUser)

router.delete('/clear/lobbyhits/:lobbyid', AdminAuthorisationHandler)
router.delete('/clear/teamhits/:teamid', AdminAuthorisationHandler)
router.delete('/clear/userhits/:userid', AdminAuthorisationHandler)
router.delete('/clear/allhits', AdminAuthorisationHandler)