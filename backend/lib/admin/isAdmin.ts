import { User } from "../../models/user.js"

export default async (userID: number) => {

    if(userID == undefined || userID == null) return false

    const user = await User.findOne({where: {id: userID}})
    if(!user) return false
    return user.dataValues.is_admin
}