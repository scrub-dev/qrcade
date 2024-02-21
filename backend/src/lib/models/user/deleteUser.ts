import { IUser } from "@src/models/user";
import { getUserByID } from "./getUser.js";
import {sequelize} from "@lib/database/database.js"

export const deleteUser = (user: IUser) => {
    deleteUserByID(user.UserID)
}

export const deleteUserByID = async (userID: string) => {
    const user = (await getUserByID(userID))
    if(!user) return false
    user.destroy()
    return true
}
