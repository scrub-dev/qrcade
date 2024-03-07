import express, {Request, Response} from "express"
import JsonResponse from "../responses/JsonResponse.js"
import AdminAuthorisationHandler from "../handlers/AdminAuthorisationHandler.js"
import { createLobby, deleteLobby, getLobbyFlags, getLobbyInfo, getLobbyPlayers, getLobbyTeam, getLobbyTeams, getLobbyTypes, getTeamPlayers, joinLobby, joinTeam, leaveLobby, leaveTeam, listLobbies, lobbyParamHandler } from "../controllers/LobbyController.js"
import UserAuthorisationHandler from "../handlers/UserAuthorisationHandler.js"

export const router = express.Router()

router.get("/test" ,(req: Request , res: Response) => {
    return JsonResponse.Test(res).send()
})

router.get("/types", getLobbyTypes) // return types of lobbies and their human-readable counterparts
router.get("/list", listLobbies) // return list of lobbies

router.post("/create", AdminAuthorisationHandler, createLobby) // create a lobby

router.get("/:lobbyid", getLobbyInfo) // Get Lobby Details

router.get("/:lobbyid/users", getLobbyPlayers) // List lobby users
router.get("/:lobbyid/flags", getLobbyFlags) // list lobby flags
router.get("/:lobbyid/teams", getLobbyTeams) // List lobby teams

router.patch("/:lobbyid/add/:param", AdminAuthorisationHandler, lobbyParamHandler) // add to a lobby (Flag, Team)
router.delete("/:lobbyid/remove/:param/:paramid", AdminAuthorisationHandler, lobbyParamHandler) // remove from a lobby (Flag, Team)

router.patch("/:lobbyid/join/:userid", UserAuthorisationHandler, joinLobby) // User joins a lobby
router.patch("/:lobbyid/leave/:userid", UserAuthorisationHandler, leaveLobby) // User leaves a lobby

router.get(  "/team/:teamid", getLobbyTeam)
router.get(  "/team/:teamid/users", getTeamPlayers)                                     // List lobby teams                                     // List lobby teams
router.patch("/team/:teamid/join/:userid", UserAuthorisationHandler ,joinTeam)  // User joins a team
router.patch("/team/:teamid/leave/:userid", UserAuthorisationHandler,leaveTeam) // User leaves a team

router.delete("/delete/:lobbyid", AdminAuthorisationHandler, deleteLobby) // delete a lobby
