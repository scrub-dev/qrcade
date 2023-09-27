import fs from 'fs'
import {sequelize} from './connection.js'
import config from '../configs/config_database.js'

import { iniPrint, errorPrint } from '../util/print.js'
import { TTable } from '../configs/types.js'
import { DEV_OPTIONS } from '../configs/config_app.js'

export const doesDBExist = () => fs.existsSync(config.DATABASE_DIR + config.DATABASE_NAME)
export const deleteDatabase = () => {fs.unlinkSync(config.DATABASE_DIR + config.DATABASE_NAME)}
const createDatabaseFile = () => fs.writeFileSync(config.DATABASE_DIR + config.DATABASE_NAME, '')
// const getTableList = () => config.TABLES.map(e => e.name)

export const createDatabase = () => {
    if(DEV_OPTIONS.DEV_MODE && !DEV_OPTIONS.PERSIST_DB){
        iniPrint(`Creating Database ${config.DATABASE_DIR + config.DATABASE_NAME}`)
        createDatabaseFile()
    }else{
        iniPrint(`Using In-Memory Database`)
    }
    // getTableList().forEach(e => createTable(e, getTableDetails(e)));
}

// const createTable = (tableName: string, tableDetails: TTable) => {
//     if(!tableDetails) return

//     let columns: string[] = []
//     tableDetails.columns.forEach( e => {
//         columns.push(`${e.name.toLowerCase()} ${e.attr.toUpperCase()}`)
//     })
//     let columnString = `(${columns.join(", ")})`

//     let tableString = `CREATE TABLE IF NOT EXISTS ${tableName} ${columnString}`
//     connection().exec(tableString)
//     iniPrint(`Creating Table: ${tableName}`)
// }

// const getTableDetails = (table: string) => {
//     let foundTable = config.TABLES.filter(e => e.name == table)
//     if(foundTable.length != 1) errorPrint("Invalid table operation")
//     else return foundTable[0]
// }