import express from 'express'
import { getLobbyScores } from '../controllers/ScoreController.js'
export const router = express.Router()

router.get("test", (req, res) => {
    res.send("test")
})

router.get("/:lobbyid", getLobbyScores)
