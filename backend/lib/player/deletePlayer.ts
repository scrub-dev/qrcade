import { User } from "../../models/user.js"

export default async (playerID) => {
    const user = await User.findOne({where: {id: playerID}})
    if(!user) return false
    await user.destroy()
    return true
}