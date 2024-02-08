import { generateFiglet } from "@lib/logging/figlet"
import { Log, LogType } from "@lib/logging/log"
import sysConfig from '@config/SystemConfig.json'
import config from '@config/InitConfig.json'
export default () => {

Log(generateFiglet(sysConfig.NAME, {}))
Log("Starting up...", LogType.INI)
Log(`v${sysConfig.VERSION}`, LogType.INI)

    // Check if ini print is enabled


    // Check if persist db is enabled
}