import { login } from '@server/controllers/AuthController.js'
import express from 'express'
export const router = express.Router()

router.get("/test", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString(), message: "HELLOWORLD"}).end()
})

router.post("/login", (req, res) => login(req,res))