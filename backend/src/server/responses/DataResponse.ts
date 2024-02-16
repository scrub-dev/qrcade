import { Response } from "express"
import { Code, ResponseCode } from "./DefaultResponse.js"

type DataResponseType = {
    code:   ResponseCode,
    data:   any[],
    length: number
}


export default class {

    protected _respBody: DataResponseType | undefined
    protected _statusCode: number | undefined
    protected _respObj: Response

    constructor(respObj: Response,
        options?: {
            code?: number,
            contents?: DataResponseType,
            type?: ResponseCode
        })
    {
        this._respObj = respObj

        if(!options) return

        if(options.code) this._statusCode = options.code
        if(options.contents) this._respBody = options.contents
    }

    code = (c: ResponseCode) => {
        this._statusCode = c
        return this
    }

    body = (c: DataResponseType) => {
        this._respBody = c
        return this
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }
}