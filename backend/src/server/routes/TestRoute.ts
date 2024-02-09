import express from 'express'
export const router = express.Router()

router.get("/helloworld", (req,res) => {
    res.send("Hello World!").end()
})

router.get("/", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString()}).end()
})