import { Sequelize } from "sequelize";
import config from "@config/GameConfig.json" assert {type: "json"}
import generateString from "@lib/util/generateString.js";

export default (s: Sequelize) => {
    const ID_LEN = config.DEFAULT_ID_LENGTH || 5

    let id = generateString(ID_LEN)
    while (!s.models.Users.findOne({where: {UserID: id}})){
        id = generateString(ID_LEN)
    }
    return config.ID_PREFIXES.USER + id
}