import DataResponse from '@server/responses/DataResponse.js'
import DefaultResponse, { ResponseCode } from '@server/responses/DefaultResponse.js'
import JsonResponse from '@server/responses/JsonResponse.js'
import express from 'express'
export const router = express.Router()

router.get("/helloworld", (req,res) => {
    res.send("Hello World!").end()
})

router.get("/", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString()}).end()
})


router.get("/output/raw", (req,res) => {
    new DefaultResponse(res).code(ResponseCode.SUCCESS).body("Test Body").send()
})
router.get("/output/json", (req,res) => {
    new JsonResponse(res).code(ResponseCode.SUCCESS).send()
})
router.get("/output/data", (req,res) => {
    new DataResponse(res).send()

})