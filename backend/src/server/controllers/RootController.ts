import { GeneralCode } from '@server/responses/DefaultResponse.js'
import JsonResponse from '@server/responses/JsonResponse.js'
import { Request, Response } from 'express'


export const ping = (req: Request, res: Response) => {
    new JsonResponse(res, {contents: {message: "PONG!", code: GeneralCode.SUCCESS}}).send()
}