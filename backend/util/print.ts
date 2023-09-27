import figlet from "figlet";
import { TDevOptions, TFigletOptions } from "../configs/types.js";
import { DEV_OPTIONS } from "../configs/config_app.js";
import chalk from 'chalk'
import { pad } from "./pad.js";

export const print = (text: any, header?: string) => header ? console.log(`${header} ${text}`) : console.log(text)
export const debugLog = (str: string) => {
    if(DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES) print("[DEBUG]", str)
}


export const figletText = (str: string, opts?: TFigletOptions) => {

    let defaultOptions: TFigletOptions = {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
    }
    return figlet.textSync(str, {...opts, ...defaultOptions})
}

export const printBool = (val: boolean, padLength?: number) => {
    if(!padLength) padLength = 0
    return val ? chalk.bold.green(pad("Enabled", padLength, "start")) : chalk.bold.red(pad("Disabled", padLength, "start"))
}

export const printDevOptions = () => {

    const printDevOption = (opt: string, val: boolean, optPadLen:number, padLength: number) => {
        console.log(`${pad(opt, optPadLen, "end")} | ${printBool(val, padLength)}`)
    }

    const padLength: number = 10
    let maxPadLength = Math.max(...Object.keys(DEV_OPTIONS).map(e => e.length))

    print(`${chalk.bold("Developer Mode")} ${printBool(DEV_OPTIONS.DEV_MODE)} \n`)
    if(!DEV_OPTIONS.DEV_MODE) return

    print(chalk.bold.blueBright.underline(`${pad("Option", maxPadLength, "end")} | ${pad("Value", padLength, "start")}`))

    let values = Object.values(DEV_OPTIONS)
    Object.keys(DEV_OPTIONS)
        .map((e,i) => [e, values[i]])
        .forEach(e => printDevOption(e[0], e[1], maxPadLength, padLength))
}

export const debugPrint = (str: string) => (DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES) ? print(str, chalk.bold.magenta(`[DEBUG]`)) : ""
export const debugWebPrint = (str: string) => (DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES && DEV_OPTIONS.SERVER_LOGGING) ? print(str, chalk.bold.magenta(`[ WEB ]`)) : ""
export const iniPrint = (str: string) => print(str, chalk.bold.magenta(`[ INI ]`))
export const errorPrint = (text: Error | string, ) =>  console.error(`${chalk.bold.red("[ERROR]")} ${text}`)
