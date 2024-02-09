import fs from 'fs'
import config from '@config/DatabaseConfig.json'
import iniConfig from '@config/InitConfig.json'
import { Log, LogType } from '@lib/logging/log'

export const doesFileExist = (location: string, name: string) => {
    return false
}
export const doesDirExist  = (location: string) => {
    return false
}
export const deleteFile    = (location: string, name: string) => {

}
export const createFile    = (location: string, name: string) => {

}

export const initialiseDatabase = () => {
    if(iniConfig.PERSIST_DB) return

    if(!doesDirExist(config.DATABASE_LOCATION)) {
        // throw err / handle
    }

    if(doesFileExist(config.DATABASE_LOCATION, config.DATABASE_NAME)){
        deleteFile(config.DATABASE_LOCATION, config.DATABASE_NAME)
    }

    createFile(config.DATABASE_LOCATION, config.DATABASE_NAME)
}