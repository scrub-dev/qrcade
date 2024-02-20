import { generateFiglet } from "@lib/logging/figlet.js"
import { Log, LogConfigs, LogType } from "@lib/logging/log.js"

import sysConfig from '@config/SystemConfig.json' assert {type: "json"}
import iniConfig from '@config/InitConfig.json' assert {type: "json"}
import dbConfig from '@config/DatabaseConfig' assert {type: "json"}
import logConfig from '@config/LogConfig.json' assert {type: "json"}

export default () => {

    Log(generateFiglet(sysConfig.NAME, {}))
    Log(`v${sysConfig.VERSION}`)
    Log("Starting up...",undefined, true)

    let configValues = [
        {name: "Initialisation", configs: iniConfig},
        {name: "Log", configs: logConfig}
    ]

    if(logConfig.PRINT_CONFIGS) Log("Printing Log Values...",LogType.INI, true)
    configValues.forEach(config => {
        LogConfigs(config)
    })
    if(logConfig.PRINT_CONFIGS) Log("Finished Printing Log Values...",LogType.INI, true)
}