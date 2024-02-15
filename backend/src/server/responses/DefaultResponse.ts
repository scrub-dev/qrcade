import { Response } from "express"

export type Code = ResponseCode | GameCode | AuthCode

export enum AuthCode {
    SUCCESS, FAIL, UNAME_DUPLICATE
}
export enum ResponseCode {
    SUCCESS, FAILED_GENERAL, ENDPOINT_INVALID
}
export enum GameCode {

}



export default class {

    protected _respBody: string | object | undefined
    protected _statusCode: number | undefined
    protected _respObj: Response

    constructor(respObj: Response,
        options?: {
            code?: number,
            contents?: string | object,
            type?: ResponseType
        })
    {
        this._respObj = respObj

        if(!options) return

        if(options.code) this._statusCode = options.code
        if(options.contents) this._respBody = options.contents
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }
}