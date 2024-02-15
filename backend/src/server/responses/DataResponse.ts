import { ErrorHandler } from "@lib/errorhandler/ErrorHandler.js"
import { Response } from "express"
import JsonResponse from "./JsonResponse.js"
import { Code } from "./DefaultResponse.js"

export default class extends JsonResponse {
    DEFAULT_STRUCTURE: {
        "message" : string,
        "code"    : Code | undefined,
        "data"    : any[],
        "length"  : number
    } = {
        "message" : ,
        "code"    : ,
        "data"    : ,
        "length"  :
    }

}