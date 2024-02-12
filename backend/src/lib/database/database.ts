import {ErrorHandler} from "@lib/errorhandler/ErrorHandler.js"
import { Log, LogType } from "@lib/logging/log.js"
import { Sequelize } from "sequelize"

export class Database {
    private static connection: Sequelize

    static getInstance = async () => {
        if(!this.connection){
            if(this.connection) return ErrorHandler.Error("Database instance not set yet, please call setInstance() first")
        }
        return this.connection
    }
    static setInstance = async (loc: string) => {
        if(this.connection) return ErrorHandler.Error("Database instance already set")
        Log(`Connecting to ${loc}`, LogType.INI)

        this.connection = new Sequelize({
            dialect: 'sqlite',
            storage: loc
        })
    }
}