import { Sequelize } from "sequelize"
import generateString from "../util/generateString.js"
import config from "@config/GameConfig.json" assert {type: "json"}


export default (s: Sequelize) => {
    const ID_LEN = config.DEFAULT_ID_LENGTH || 5

    let id = generateString(ID_LEN)
    while (!s.models.Flags.findOne({where: {LobbyID: config.ID_PREFIXES.FLAG + id}})){
        id = generateString(ID_LEN)
    }
    return config.ID_PREFIXES.FLAG + id
}