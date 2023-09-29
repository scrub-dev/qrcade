import { User } from "../../models/user.js"

export default async (playerID: number, team: string | undefined) => {
    let user = await User.findOne({where: {id: playerID}})
    if(!user) return false

    user.update({team: team})
    user.save()
    return true
}