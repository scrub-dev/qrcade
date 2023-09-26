import fs from 'fs'
import connection from './connection.js'
import config from './config.js'

import { iniPrint, errorPrint } from '../util/print.js'
import { TTable } from '../util/types.js'

export const doesDBExist = () => fs.existsSync(config.DATABASE_DIR + config.DATABASE_NAME)
export const deleteDatabase = () => {fs.unlinkSync(config.DATABASE_DIR + config.DATABASE_NAME)}
const createDatabaseFile = () => fs.writeFileSync(config.DATABASE_DIR + config.DATABASE_NAME, '')
const getTableList = () => config.TABLES.map(e => e.name)

export const createDatabase = () => {
    iniPrint(`Creating Database ${config.DATABASE_DIR + config.DATABASE_NAME}`)
    createDatabaseFile()
    getTableList().forEach(e => createTable(e, getTableDetails(e)));
}

const createTable = (tableName: string, tableDetails: TTable) => {
    if(!tableDetails) return

    let columns: string[] = []
    tableDetails.columns.forEach( e => {
        columns.push(`${e.name.toLowerCase()} ${e.attr.toUpperCase()}`)
    })
    let columnString = `(${columns.join(", ")})`

    let tableString = `CREATE TABLE IF NOT EXISTS ${tableName} ${columnString}`
    connection().exec(tableString)
    iniPrint(`Creating Table: ${tableName}`)
}

const getTableDetails = (table: string) => {
    let foundTable = config.TABLES.filter(e => e.name == table)
    if(foundTable.length != 1) errorPrint("Invalid table operation")
    else return foundTable[0]
}