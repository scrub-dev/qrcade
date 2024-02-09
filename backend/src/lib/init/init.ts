import { generateFiglet } from "@lib/logging/figlet"
import { Log, LogConfigs, LogType } from "@lib/logging/log"

import sysConfig from '@config/SystemConfig.json'
import iniConfig from '@config/InitConfig.json'
import dbConfig from '@config/DatabaseConfig.json'
import logConfig from '@config/LogConfig.json'

export default () => {

    Log(generateFiglet(sysConfig.NAME, {}))
    Log(`v${sysConfig.VERSION}`)
    Log("Starting up...",undefined, true)

    let configValues = [
        {name: "Initialisation", configs: iniConfig},
        {name: "Database", configs: dbConfig},
        {name: "Log", configs: logConfig}
    ]

    if(logConfig.PRINT_CONFIGS) Log("Printing Log Values...",LogType.INI, true)
    configValues.forEach(config => {
        LogConfigs(config)
    })
    if(logConfig.PRINT_CONFIGS) Log("Finished Printing Log Values...",LogType.INI, true)


    // Do Database stuff

}