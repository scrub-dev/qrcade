import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Flag = seq.define('Flag', {
        FlagID: DataTypes.STRING,
        FlagName: DataTypes.STRING,
        FlagDesc: DataTypes.STRING,
        FlagInfo: DataTypes.TEXT()
    })
    return Flag
}