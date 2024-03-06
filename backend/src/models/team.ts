import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Team = seq.define('Teams', {
        TeamID : {type: DataTypes.STRING, primaryKey: true},
        TeamName: DataTypes.STRING,
        TeamColour: DataTypes.STRING,
    })
    return Team
}