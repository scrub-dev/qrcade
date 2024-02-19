import { Response } from "express"

export type Code = GameCode | AuthCode | ResponseCode

export enum AuthCode {
    SUCCESS, FAIL, UNAME_DUPLICATE
}
export enum GameCode {

}
export enum ResponseCode {
    SUCCESS        = 200,

    REDIRECT_PERM  = 301,
    MOVED_TEMP     = 307,
    MOVED_PERM     = 308,

    BAD_RESP       = 400,
    UNAUTHORISED   = 401,
    FORBIDDEN      = 403,
    NOT_FOUND      = 404,
    WRONG_METHOD   = 405,
    TEAPOT         = 418,
    RATELIMIT      = 429,

    SERVER_ERROR   = 500,
}


export default class {

    protected _respBody: string | object | undefined
    protected _statusCode: number | undefined
    protected _respObj: Response

    constructor(respObj: Response,
        options?: {
            code?: number,
            contents?: string | object,
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

    body = (c: string | object) => {
        this._respBody = c
        return this
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }
}