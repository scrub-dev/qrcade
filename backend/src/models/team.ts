import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Team = seq.define('Team', {
        TeamID : DataTypes.STRING,
        TeamName: DataTypes.STRING
    })
    return Team
}