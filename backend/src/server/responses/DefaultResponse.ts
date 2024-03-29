import { Response } from "express"

export type Code = GameCode | AuthCode | GeneralCode

export enum GeneralCode {
    SUCCESS = "SUCCESS",
    NOT_FOUND = "NOT_FOUND",
    GENERAL_FAILURE = "GENERAL_FAILURE",
    NOT_SUPPORTED   = "NOT_SUPPORTED",
    FIELD_UPDATED   = "FIELD_UPDATED",
    DUPLICATE       = "DUPLICATE"
}

export enum AuthCode {
    SUCCESS = "AUTH_SUCCESS",
    FAIL = "AUTH_FAIL",
    UNAME_DUPLICATE = "REGISTER_UNAME_DUPLICATE",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    UNAUTHORIZED     = "UNAUTHORIZED"
}

export enum GameCode {
    USER_LEFT_LOBBY = "USER_LEFT_LOBBY",
    USER_JOINED_LOBBY = "USER_JOINED_LOBBY",
    USER_LEFT_TEAM = "USER_LEFT_TEAM",
    USER_JOINED_TEAM = "USER_JOINED_TEAM",

    INVALID_SCAN_TYPE = "INVALID_SCAN_TYPE",
    INVALID_LOBBY_DIFFERENT = "INVALID_LOBBY_DIFFERENT",
    INVALID_TEAM_SAME = "INVALID_TEAM_SAME",
    INVALID_PLAYER_SAME = "INVALID_PLAYER_SAME",
    INVALID_HIT = "INVALID_HIT",
    VALID_HIT = "VALID_HIT",

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
            code?: Code,
            contents?: string | object,
            statusCode: ResponseCode
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

    body = (c: string | object) => {
        this._respBody = c
        return this
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }
}