import { ping } from '@server/controllers/RootController.js'
import express from 'express'
export const router = express.Router()

router.get("/ping", (req, res) => ping(req,res))