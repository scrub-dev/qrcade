import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Team = seq.define('Teams', {
        TeamID : DataTypes.STRING,
        TeamName: DataTypes.STRING,
        TeamColour: DataTypes.STRING,
    })
    return Team
}