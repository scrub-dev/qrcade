import fs from 'fs'
import config from '@config/DatabaseConfig.json' assert {type: "json"}
import iniConfig from '@config/InitConfig.json' assert {type: "json"}
import { Log, LogType } from '@lib/logging/log.js'
import { Database } from '@lib/database/database.js'
import {ErrorHandler} from '@lib/errorhandler/ErrorHandler.js'
import associations, { models } from 'src/models/associations.js'

export const doesFileExist = (location: string, name: string) => {
    return fs.existsSync(location + name)
}
export const deleteFile    = async (location: string, name: string) => {
    fs.unlinkSync(location + name)
}
export const createFile    = async (location: string, name: string) => {
    fs.writeFileSync(location + name, '')
}

export const initialiseDatabase = async (location: string) => {

    if(!iniConfig.PERSIST_DB && doesFileExist(location, config.DATABASE_NAME) ){
        Log(`Database file already exists, deleting...`, LogType.INI)
        deleteFile(location, config.DATABASE_NAME).then(() => Log(`Database file deleted: ${location}`, LogType.INI))
    }

    createFile(location, config.DATABASE_NAME).then(() => Log(`Created database file: ${location}`, LogType.INI))

    try {
        Database.setInstance(location + config.DATABASE_NAME).then(() => {Log(`Database instance set...`, LogType.INI)})

        Log(`Testing database connection`, LogType.DATABASE)
        ;(await Database.getInstance()).authenticate().then(() =>
            Log(`Database connection test successful`, LogType.DATABASE))

    } catch (err: unknown) {
        let msg = "Unknown error occured"
        if(err instanceof Error) msg = err.message
        ErrorHandler.Error(msg)
    }

    try {
        const database = await Database.getInstance()
        models().forEach(m => m(database))
        associations(database)
        database.sync()
    } catch (err) {
        let msg = "Unknown error occured"
        if(err instanceof Error) msg = err.message
        ErrorHandler.Error(msg)
    }
    Log("Models created and available: " + (await Database.getInstance()).modelManager.all.map(m => m.name), LogType.DATABASE)
}