import  GameConfig  from "@config/GameConfig.json" assert {type: "json"}
import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Lobby = seq.define('Lobby', {
        LobbyName   : DataTypes.STRING,
        LobbyType   : DataTypes.ENUM(...GameConfig.GAMEMODES),
    })
    return Lobby
}