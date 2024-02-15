import { ErrorHandler } from "@lib/errorhandler/ErrorHandler.js"
import { Response } from "express"
import DefaultResponse, { Code } from "./DefaultResponse.js"

export default class extends DefaultResponse {
    declare _respBody: object | undefined

    DEFAULT_STRUCTURE: {
        "message" : string,
        "code"    : Code | undefined,
    } = {
        message: "",
        code: undefined
    }

    send = () => {
        this._respObj?.send(this._respBody).status(this._statusCode || 200).end()
    }

}