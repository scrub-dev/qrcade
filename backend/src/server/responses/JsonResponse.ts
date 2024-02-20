import { Response } from "express"
import { Code, ResponseCode } from "./DefaultResponse.js"

export type JsonResponseType = {
    message: string,
    code: Code
}

export default class {

    protected _respBody: JsonResponseType | undefined
    protected _statusCode: ResponseCode | undefined
    protected _respObj: Response

    constructor(respObj: Response,
        options?: {
            statusCode?: ResponseCode,
            contents?: JsonResponseType,
        })
    {
        this._respObj = respObj

        if(!options) return

        if(options.statusCode) this._statusCode = options.statusCode
        if(options.contents) this._respBody = options.contents
    }

    statusCode = (c: ResponseCode) => {
        this._statusCode = c
        return this
    }

    body = (c: JsonResponseType) => {
        this._respBody = c
        return this
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }
}