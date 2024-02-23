import { Log, LogType } from "@lib/logging/log.js"
import { Sequelize } from "sequelize"
import config from '@config/DatabaseConfig.js'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${config.DATABASE_LOCATION}`,
    logging: (...m) => Log(m[0], LogType.DATABASE_VERBOSE)
})