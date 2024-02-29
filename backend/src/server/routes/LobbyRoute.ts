import express, {Request, Response} from "express"
import JsonResponse from "../responses/JsonResponse.js"

export const router = express.Router()

router.get("/test" ,(req: Request , res: Response) => {
    return JsonResponse.Test(res).send()
})


router.get("/types")
router.get("/list")
router.get("/:lobbyid/users")
router.get("/:lobbyid/flags")

router.post("/create")