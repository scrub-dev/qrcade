import config from '@config/LogConfig.json'
import chalk from 'chalk'

export enum LogType {
    VERBOSE,
    ERROR,
    INI,
    OK
}

export const Log = (message: string, type?: LogType) => {
    if(!config.PRINT_TO_CONSOLE) return
    if(type != null && !isLogTypeEnabled(type)) return

    if(!type) console.log(message)
    else console.log(getLogStyle(type) + " " + message)
}

export const isLogTypeEnabled = (type: LogType) => {
    return getLogEnabledValue(type)
}

export const getLogEnabledValue = (type: LogType) => {
    switch(type){
        default: return true
        case LogType.VERBOSE:
            return config.LOG_VERBOSE
        case LogType.ERROR:
            return config.LOG_ERRORS
        case LogType.INI:
            return config.LOG_INI
    }
}

export const getLogStyle = (type?: LogType) => {
    switch(type){
        default: return chalk.blue("[ QRC ]")
        case LogType.VERBOSE:
            return chalk.yellow("[ LOG ]")
        case LogType.ERROR:
            return chalk.red("[ ERR ]")
        case LogType.INI:
            return chalk.blue("[ INI ]")
        case LogType.OK:
            return chalk.greenBright("[  OK ]")
    }
}