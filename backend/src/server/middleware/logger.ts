import { Log, LogType } from "@lib/logging/log.js"
import {NextFunction, Request, Response} from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date().toLocaleDateString([], {month: '2-digit', day: '2-digit'})
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const endpoint = req.url

    Log(`${currentDate} ${currentTime} | ${endpoint}`, LogType.API)
    next()
}