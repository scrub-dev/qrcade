import config from '@config/LogConfig.json' assert {type: "json"}
import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Log = seq.define('Log', {
        LogID: DataTypes.STRING,
        Type: DataTypes.ENUM(...config.GAME_LOG.TYPES),
        LogMessage: DataTypes.TEXT
    })
    return Log
}