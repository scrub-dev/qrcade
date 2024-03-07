import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Flag = seq.define('Flags', {
        FlagID: {type: DataTypes.STRING, primaryKey: true},
        FlagName: DataTypes.STRING,
        FlagDesc: DataTypes.STRING,
        FlagInfo: DataTypes.TEXT()
    })
    return Flag
}