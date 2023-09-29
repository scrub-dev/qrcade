import { User } from "../../models/user.js"

export default async (userID: number) => {
    const user = await User.findOne({where: {id: userID}})
    if(!user) return false
    return user.dataValues.is_admin
}