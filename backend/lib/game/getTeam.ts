import { User } from "../../models/user.js"

export default async (playerID: number) => {
    let user = await User.findOne({where: {id: playerID}})
    if(!user) return undefined
    else return user.dataValues.team
}