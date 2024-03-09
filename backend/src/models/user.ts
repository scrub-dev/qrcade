import { DataTypes, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const User = seq.define('Users', {
        UserID     : {type: DataTypes.STRING, primaryKey: true},
        Username   : DataTypes.STRING,
        DisplayName: DataTypes.STRING,
        Passwd     : DataTypes.STRING,
        Admin      : DataTypes.BOOLEAN
    })
    return User
}

export interface IUser {
    [x: string]: unknown;
    UserID: string,
    Username: string,
    DisplayName: string,
    Passwd: string,
    Admin: Boolean,
    TeamID?: string,
    LobbyID?: string
}