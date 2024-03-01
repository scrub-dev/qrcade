import express, {Request, Response} from "express"
import JsonResponse from "../responses/JsonResponse.js"
import AdminAuthorisationHandler from "../handlers/AdminAuthorisationHandler.js"

export const router = express.Router()

router.get("/test" ,(req: Request , res: Response) => {
    return JsonResponse.Test(res).send()
})

// TODO:
/**
 * 1. Create a lobby type json file with types of play defined
 * eg: {name: string, human-readable-name: string, rules: [REQUIRE_FLAG, NO_FLAG, REQUIRE_TEAMS, NO_TEAMS] }
 *
 * 2. Create Repository Abstraction functions for the lot
 *
 * (Store lobbytype as the LobbyEnumName, lookup in config when it needs to be evaluated into rules)
*/


router.get("/types") // return types of lobbies and their human-readable counterparts
router.get("/list") // return list of lobbies

router.post("/create", AdminAuthorisationHandler) // create a lobby

router.get("/:lobbyid") // Get Lobby Details

router.get("/:lobbyid/users") // List lobby users
router.get("/:lobbyid/flags") // list lobby flags
router.get("/:lobbyid/teams") // List lobby teams


router.patch("/:lobbyid/add/:param", AdminAuthorisationHandler) // add to a lobby (Flag, Team)
router.patch("/:lobbyid/add/:param", AdminAuthorisationHandler) // add to a lobby (Flag, Team)

router.delete("/:lobbyid/remove/:param", AdminAuthorisationHandler) // remove from a lobby (Flag, Team)
router.delete("/:lobbyid/remove/:param", AdminAuthorisationHandler) // remove from a lobby (Flag, Team)

router.patch("/:lobbyid/join/:userid") // User joins a lobby
router.patch("/:lobbyid/leave/:userid") // User leaves a lobby


router.delete("/delete/:lobbyid", AdminAuthorisationHandler) // delete a lobby