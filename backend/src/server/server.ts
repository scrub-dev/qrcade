import { Log, LogType } from '@lib/logging/log.js';
import express, {Express, NextFunction, Request, Response, Router} from 'express'


import {router as testRouter} from './routes/TestRoute.js'
import {logger} from './middleware/logger.js';

export class Server {

    private DEFAULT_PORT = 1234
    private _app: Express

    constructor(app?: Express){
        this._app = app ?? express()

        Log("Server created", LogType.SERVER)

        this.registerMiddleware()
        this.registerRouters()

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
            {name: "test", route: "/test", router: testRouter}
        ]
        routes.forEach(e => {
            this._app.use(e.route, e.router);
            Log(`Router loaded: ${e.name}`, LogType.SERVER)
        })
    }

    get app() {return this._app}
    set app(newApp: Express) {this._app = newApp}
}