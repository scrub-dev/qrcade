import { DataTypes, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const User = seq.define('Users', {
        UserID     : DataTypes.STRING,
        Username   : DataTypes.STRING,
        DisplayName: DataTypes.STRING,
        Passwd     : DataTypes.STRING,
        Admin      : DataTypes.BOOLEAN
    })
    return User
}