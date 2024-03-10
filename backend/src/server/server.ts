import { Log, LogType } from '@lib/logging/log.js';
import express, {Express, NextFunction, Request, Response, Router} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import LoginLocalStrategy from '@lib/auth/LoginLocalStrategy.js'
import RegisterLocalStrategy from '@lib/auth/RegisterLocalStrategy.js'
import AuthorizeJWTStrategy from '@src/lib/auth/AuthorizeJWTStrategy.js';

import {router as AuthRouter } from './routes/AuthRoute.js'
import {router as TestRouter } from './routes/TestRoute.js'
import {router as UserRouter } from './routes/UserRoute.js'
import {router as RootRouter } from './routes/RootRoute.js'
import {router as AdminRouter} from './routes/AdminRoute.js'
import {router as LobbyRouter} from './routes/LobbyRoute.js'
import {router as HitRouter  } from './routes/HitRoute.js'
import {router as ScoreRouter  } from './routes/ScoreRoute.js'

import {logger} from './middleware/logger.js';
import { GeneralCode, ResponseCode } from './responses/DefaultResponse.js';
import JsonResponse from './responses/JsonResponse.js';
import passport from 'passport';
import {addUserToReqFromBearerToken} from './middleware/getUserFromBearerToken.js';

export class Server {

    private DEFAULT_PORT = 5000
    private _app: Express

    constructor(app?: Express){
        this._app = app ?? express()

        Log("Server created", LogType.SERVER)

        this.registerMiddleware()
        this.registerAuthStrategies()
        this.registerRouters()
        this.declareCatchAll()

    }

    listen = (port?: number) => {
        let p = port ?? this.DEFAULT_PORT
        this._app.listen(p)
        Log(`Server listening @ 0.0.0.0:${p}`, LogType.SERVER)
    }

    registerMiddleware = () => {
        const middleware = [
            {name: "cors",         func: cors({credentials: true, origin: "https://qrcade.xyz", optionsSuccessStatus: 200})},
            {name: "logger",       func: logger},
            {name: "passport",     func: passport.initialize()},
            {name: "cookieparser", func: cookieParser()},
            {name: "urlencoded",   func: express.urlencoded({extended: false})},
            {name: "json",         func: express.json()},
            {name: "userparser",   func: addUserToReqFromBearerToken}

        ]
        middleware.forEach(e => {
            this._app.use(e.func);
            Log(`Middleware loaded: ${e.name}`, LogType.SERVER)
        })
    }

    registerRouters = () => {
        const routes: {name: string, route: string, router: Router}[] = [
            {name: "Root",  route: "/",      router: RootRouter },
            {name: "Test",  route: "/test",  router: TestRouter },
            {name: "Auth",  route: "/auth",  router: AuthRouter },
            {name: "User",  route: "/user",  router: UserRouter },
            {name: "Admin", route: "/admin", router: AdminRouter},
            {name: "Lobby", route: "/lobby", router: LobbyRouter},
            {name: "Hit",   route: "/hit",   router: HitRouter  },
            {name: "Score", route: "/score", router: ScoreRouter}
        ]
        routes.forEach(e => {
            this._app.use(e.route, e.router);
            Log(`Router loaded: ${e.name}`, LogType.SERVER)
        })
    }

    registerAuthStrategies = () => {
        LoginLocalStrategy()
        RegisterLocalStrategy()
        AuthorizeJWTStrategy()
        Log("Declaring auth strategies", LogType.SERVER)
    }

    declareCatchAll = () => {
        // run this after registering routes
        // running before will mean this will always be called
        Log("Declaring catchall function...", LogType.SERVER)
        this._app.use((req: Request, res: Response, next: NextFunction) => {
            new JsonResponse(res, {statusCode: 404,contents: {message: "Sorry, the requested resource was not found on the server", code: GeneralCode.NOT_FOUND}}).statusCode(ResponseCode.NOT_FOUND).send()
        })
    }

    get app() {return this._app}
    set app(newApp: Express) {this._app = newApp}
}