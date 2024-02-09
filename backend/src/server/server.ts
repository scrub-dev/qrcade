import { Log, LogType } from '@lib/logging/log.js';
import express, {Express} from 'express'
import { IRouteManager, RouteManager } from './routes/RouteManager.js';
export class Server {

    private DEFAULT_PORT = 1234
    private _app: Express
    private _RouteManager: IRouteManager

    constructor(app?: Express, rtmngr?: RouteManager){
        this._app = app ?? express()
        Log("Server created", LogType.SERVER)

        this._RouteManager = rtmngr ?? new RouteManager()
        this._RouteManager.registerRoutes()
    }

    listen = (port?: number) => {
        let p = port ?? this.DEFAULT_PORT
        this._app.listen(p)
        Log(`Server listening @ 0.0.0.0:${p}`, LogType.SERVER)
    }

    get app() {return this._app}
    set app(newApp: Express) {this._app = newApp}
}