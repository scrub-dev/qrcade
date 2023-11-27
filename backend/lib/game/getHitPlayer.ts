import { Hit } from "../../models/hits.js"
import { User } from "../../models/user.js"

export default async (userID) => {
    let user = await User.findOne({where : {id : userID}})

    let playerHitCount =  await Hit.count({ where: {player_hit : user.dataValues.id}})

    return playerHitCount

}