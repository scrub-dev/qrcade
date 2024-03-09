import { Response } from "express"
import { AuthCode, Code, GameCode, GeneralCode, ResponseCode } from "./DefaultResponse.js"

export type JsonResponseType = {
    message: string,
    code: Code,
    [key: string]: any
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

    static Test = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `Test :)`}})
    static InsuffientPermissions = (res: Response) => new this(res, {statusCode: ResponseCode.UNAUTHORISED, contents: {code: AuthCode.UNAUTHORIZED , message: "You do not have sufficient permissions to perform this action!"}})
    static FieldNotSupported = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_SUPPORTED, message: "You cannot modify this field."}})
    static FieldUpdated = (res: Response, field: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.FIELD_UPDATED, message: `Field updated: ${field}`}})
    static NotFound = (res: Response, found?: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_FOUND, message: `The requested resource was not found ${found || ""}`}})
    static Deleted = (res: Response, deleted?: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `${deleted || "Object"} deleted`}})
    static Created = (res: Response, created: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.SUCCESS, message: `${created} created!`}})
    static NoResults = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_FOUND, message: `No Results`}})
    static MissingFields = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_FOUND, message: `One or more fields are missing`}})
    static InvalidType = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GeneralCode.NOT_FOUND, message: `Invalid type provided`}})


    // GAME SPECIFIC
    static UserLeftLobby = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.USER_LEFT_LOBBY, message: `Lobby Left`}})
    static UserJoinedLobby = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.USER_JOINED_LOBBY, message: `Lobby Joined`}})
    static UserLeftTeam = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.USER_LEFT_TEAM, message: `Team Left`}})
    static UserJoinedTeam = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.USER_JOINED_TEAM, message: `Team Joined`}})

    static InvalidScanType = (res: Response, message: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_SCAN_TYPE, message: message}})
    static DifferentLobby = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_LOBBY_DIFFERENT, message: "You are in a different lobby!"}})
    static SameTeam = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_TEAM_SAME, message: "You are on the same team!"}})
    static SamePlayer = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_PLAYER_SAME, message: "You cannot scan yourself!"}})
    static SomethingWentWrong = (res: Response, message: string) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_HIT, message: message}})
    static ScannedUserNotInTeam = (res: Response) => new this(res, {statusCode: ResponseCode.SUCCESS, contents: {code: GameCode.INVALID_HIT, message: "Scanned Player not in a team"}})
}