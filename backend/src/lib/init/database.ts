import fs from 'fs'
import config from '@config/DatabaseConfig.json'

export const createSQLiteFile = (location: string, name: string) => {

    if(!isLocationValid) {

    }

    fs.openSync(location + name, 'w')
}


export const isLocationValid = (location: string) => {
    return fs.existsSync(location)
}