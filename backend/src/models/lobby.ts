import  GameConfig  from "@config/GameConfig.json" assert {type: "json"}
import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Lobby = seq.define('Lobbies', {
        LobbyID     : {type: DataTypes.STRING, primaryKey: true},
        LobbyName   : DataTypes.STRING,
        LobbyType   : DataTypes.ENUM(...GameConfig.GAMEMODES.map(e => e.name)),
    })
    return Lobby
}