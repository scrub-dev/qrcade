import fs from 'fs'
import config from '@config/DatabaseConfig.js'
import iniConfig from '@config/InitConfig.json' assert {type: "json"}
import { Log, LogType } from '@lib/logging/log.js'
import { sequelize } from '@lib/database/database.js'
import {ErrorHandler} from '@lib/errorhandler/ErrorHandler.js'
import associations, { models } from 'src/models/associations.js'
import { cwd } from 'node:process'

export const doesFileExist = (location: string) => {
    return fs.existsSync(location)
}
export const deleteFile    = async (location: string,) => {
    fs.unlinkSync(location)
}


export const initialiseDatabase = async (location: string) => {
    console.log(location)

    if(!iniConfig.PERSIST_DB && doesFileExist(location) ){
        Log(`Database file already exists, deleting...`, LogType.INI)
        deleteFile(location).then(() => Log(`Database file deleted: ${location}`, LogType.INI))
    }

    try {

        Log(`Testing database connection`, LogType.DATABASE)
        sequelize.authenticate()
        Log(`Database connection test successful`, LogType.DATABASE)

    } catch (err: unknown) {
        let msg = "Unknown error occured"
        if(err instanceof Error) msg = err.message
        ErrorHandler.Error(msg)
    }

    try {
        const database = sequelize
        models().forEach(m => m(database))
        associations(database)
        await database.sync()
        Log("Models created and available: " + sequelize.modelManager.all.map(m => m.name), LogType.DATABASE)

    } catch (err) {
        let msg = "Unknown error occured"
        if(err instanceof Error) msg = err.message
        ErrorHandler.Error(msg)
    }
}