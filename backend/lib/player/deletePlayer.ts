import { User } from "../../models/user.js"

export default async (playerID) => {
    const user = await User.findOne({where: {id: playerID}})
    await user.destroy()
    return true
}