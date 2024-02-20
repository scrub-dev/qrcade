import { Log, LogType } from "@lib/logging/log.js"
import { Sequelize } from "sequelize"
import config from '@config/DatabaseConfig.js'
import path from "node:path"
// import { Sequelize } from "sequelize"

// export class Database {
//     private static _location : string
//     private static connection: Sequelize
//     static getInstance = () =>
//         new Sequelize({
//             dialect: 'sqlite',
//             storage: this._location,
//             logging: (...msg) => Log(msg[0], LogType.DATABASE_VERBOSE),
//         })
//     static setInstance = (loc: string) => {
//         if(this.connection) return ErrorHandler.Error("Database instance already set")
//         Log(`Setting DB to ${loc}`, LogType.DATABASE)
//         this._location = loc
//     }
// }

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${config.DATABASE_LOCATION}${path.sep}${config.DATABASE_NAME}`,
    logging: (...m) => Log(m[0], LogType.DATABASE_VERBOSE)
})