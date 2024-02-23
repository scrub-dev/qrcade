import  GameConfig  from "@config/GameConfig.json" assert {type: "json"}
import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Lobby = seq.define('Lobby', {
        LobbyID     : DataTypes.STRING,
        LobbyName   : DataTypes.STRING,
        LobbyType   : DataTypes.ENUM(...GameConfig.GAMEMODES),
    })
    return Lobby
}