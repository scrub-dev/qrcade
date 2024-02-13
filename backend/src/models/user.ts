import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const User = seq.define('User', {
        UserID     : DataTypes.STRING,
        Username   : DataTypes.STRING,
        DisplayName: DataTypes.STRING,
        Passwd     : DataTypes.STRING,
        Admin      : DataTypes.BOOLEAN
    })
    return User
}