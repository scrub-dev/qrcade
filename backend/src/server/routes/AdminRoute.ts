import express, {Request, Response} from "express"
import AdminAuthorisationHandler from "../handlers/AdminAuthorisationHandler"
import JsonResponse from "../responses/JsonResponse"
import { add, deleteUser, remove, reset } from "../controllers/AdminController"

export const router = express.Router()

router.get("/test", AdminAuthorisationHandler ,(req: Request , res: Response) => {
    return JsonResponse.Test(res).send()
})

// :param = admin
router.patch('/add/:userid/:param', AdminAuthorisationHandler, add)

// : param = admin
router.patch('/remove/:userid/:param', AdminAuthorisationHandler, remove)

// :param = [displayname || password]
router.patch('/reset/:userid/:param', AdminAuthorisationHandler, reset)

router.delete('delete/:userid', AdminAuthorisationHandler, deleteUser)