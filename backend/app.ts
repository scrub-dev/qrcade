import express, { Request, Response, NextFunction }  from 'express'
import { DEV_OPTIONS } from './config.js'
import { debugWebPrint } from './util/print.js'

export const app = express()

const webLogger = (req: Request, res: Response, next: NextFunction) => {
    debugWebPrint(`Path: ${req.url} | Time: ${new Date(Date.now()).toUTCString()}`)
    next()
}

app.use(webLogger)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World").status(200).end()
})

app.get("/auth", (req: Request, res: Response) => {
    res.send("Hello AUTH").status(200).end()
})

app.get("/getuser", (req: Request, res: Response) => {
    res.send("Hello GETUSER").status(200).end()
})

app.get("/hit", (req: Request, res: Response) => {
    res.send("YOU SHOT SOMEONE!!!!!111").status(200).end()
})