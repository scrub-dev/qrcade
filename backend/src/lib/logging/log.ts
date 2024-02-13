import config from '@config/LogConfig.json' assert {type: "json"}
import chalk from 'chalk'
import { PadDirection, pad } from './pad.js'

export enum LogType {
    VERBOSE,
    ERROR,
    INI,
    API,
    SERVER,
    DATABASE,
    DATABASE_VERBOSE
}

const _Log = (message: string, type?: LogType) => type ? console.log(getLogStyle(type) + " " + message) : console.log(message)

export const Log = (message: string, type?: LogType, override?: boolean) => {

    if(override) {
        _Log(message, type)
        return
    }

    if(!config.PRINT_TO_CONSOLE) return
    if(type != null && !isLogTypeEnabled(type)) return

    _Log(message, type)
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
        case LogType.API:
            return config.LOG_API
        case LogType.INI:
            return config.LOG_INI
        case LogType.INI:
            return config.LOG_SERVER
        case LogType.DATABASE:
            return config.LOG_DB
        case LogType.DATABASE_VERBOSE:
            return config.LOG_DB_VERBOSE
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
        case LogType.API:
            return chalk.blue("[ API ]")
        case LogType.SERVER:
            return chalk.magenta("[ SVR ]")
        case LogType.DATABASE:
            return chalk.yellow("[  DB ]")
        case LogType.DATABASE_VERBOSE:
            return chalk.yellow("[ DBV ]")
    }
}

export const LogConfigs = (configs: {name: string, configs: object}) => {

    if(!config.PRINT_TO_CONSOLE || !config.PRINT_CONFIGS) return

    const _printOpt = (o: string, v: boolean, p: number, p_: number) => console.log(`${pad(o, p, PadDirection.END)} | ${getBoolStyle(v, p_)}`)

    let configList = configs.configs
    let name = chalk.white.bold.underline(configs.name.toUpperCase() + " CONFIG")

    const padLength = 10
    let maxPadLength = 20

    console.log(name)
    console.log(chalk.bold.blueBright.underline(`${pad("Option", maxPadLength, PadDirection.START)} | ${pad("Value", padLength, PadDirection.END)}`))

    let values = Object.values(configList)
    Object.keys(configList)
        .map((e,i) => [e, values[i]])
        .forEach(e => _printOpt(e[0], e[1], maxPadLength, padLength))
    console.log("")

}

export const getBoolStyle = (b: boolean, p: number) => b ? chalk.bold.green(pad("Enabled", p, PadDirection.START)) : chalk.bold.red(pad("Disabled", p, PadDirection.START))