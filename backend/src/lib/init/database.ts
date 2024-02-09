import fs from 'fs'
import config from '@config/DatabaseConfig.json' assert {type: "json"}
import iniConfig from '@config/InitConfig.json' assert {type: "json"}
import { Log, LogType } from '@lib/logging/log.js'

export const doesFileExist = (location: string, name: string) => {
    return fs.existsSync(location + name)
}
export const deleteFile    = async (location: string, name: string) => {
    fs.unlinkSync(location + name)
}
export const createFile    = async (location: string, name: string) => {
    fs.writeFileSync(location + name, '')
}

export const initialiseDatabase = (location: string) => {

    if(iniConfig.PERSIST_DB) return

    if(doesFileExist(location, config.DATABASE_NAME)){
        Log(`Database file already exists, deleting...`, LogType.INI)
        deleteFile(location, config.DATABASE_NAME).then(() => Log(`Database file deleted: ${location}`, LogType.INI))
    }

    createFile(location, config.DATABASE_NAME).then(() => Log(`Created database file: ${location}`, LogType.INI))
}