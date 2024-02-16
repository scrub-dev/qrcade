import { Log, LogType } from '@lib/logging/log.js';
import express, {Express, NextFunction, Request, Response, Router} from 'express'

import {router as AuthRouter} from './routes/AuthRoute.js'
import {router as TestRouter} from './routes/TestRoute.js'
import {router as UserRouter} from './routes/UserRoute.js'
import {router as RootRouter} from './routes/RootRoute.js'


import {logger} from './middleware/logger.js';
import DefaultResponse, { ResponseCode } from './responses/DefaultResponse.js';
import JsonResponse from './responses/JsonResponse.js';

export class Server {

    private DEFAULT_PORT = 1234
    private _app: Express

    constructor(app?: Express){
        this._app = app ?? express()

        Log("Server created", LogType.SERVER)

        this.registerMiddleware()
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
            {name: "logger",     func: logger},
            {name: "urlencoded", func: express.urlencoded({extended: true})},
            {name: "json",       func: express.json()}
        ]
        middleware.forEach(e => {
            this._app.use(e.func);
            Log(`Middleware loaded: ${e.name}`, LogType.SERVER)
        })
    }

    registerRouters = () => {
        const routes: {name: string, route: string, router: Router}[] = [
            {name: "Root", route: "/",     router: RootRouter},
            {name: "Test", route: "/test", router: TestRouter},
            {name: "Auth", route: "/auth", router: AuthRouter},
            {name: "User", route: "/user", router: UserRouter}
        ]
        routes.forEach(e => {
            this._app.use(e.route, e.router);
            Log(`Router loaded: ${e.name}`, LogType.SERVER)
        })
    }

    declareCatchAll = () => {
        // run this after registering routes
        // running before will mean this will always be called
        Log("Declaring catchall function...", LogType.SERVER)
        this._app.use((req: Request, res: Response, next: NextFunction) => {
            new JsonResponse(res, {code: 404, contents: {message: "Sorry, the requested resource was not found on the server", code: ResponseCode.NOT_FOUND}}).send()
        })
    }

    get app() {return this._app}
    set app(newApp: Express) {this._app = newApp}
}