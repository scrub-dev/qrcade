import { Hit } from "../../models/hits.js"
import { User } from "../../models/user.js"

export default async (userID) => {
    let user = await User.findOne({where : {id : userID}})
    console.log(userID)
    let playerHitCount =  await Hit.count({ where: {player : user.dataValues.id}})

    return playerHitCount

}