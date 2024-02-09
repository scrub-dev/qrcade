import { Log, LogType } from '@lib/logging/log.js';
import express, {Express} from 'express'
export class Server {

    DEFAULT_PORT = 1234

    app: Express;

    constructor(app?: Express){
        this.app = app ?? express()
        Log("Server created", LogType.SERVER)
    }


    listen = (port?: number) => {
        let p = port ?? this.DEFAULT_PORT
        this.app.listen(p)
        Log(`Server listening @0.0.0.0:${p}`, LogType.SERVER)
    }
}