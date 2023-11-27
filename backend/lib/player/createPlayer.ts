import { User } from "../../models/user.js"
import hashPword from "../auth/auth/hashPword.js"

 export default async (username: string, password: string, id: number, isAdmin: boolean) => {
    User.create({
        id: id,
        pword: await hashPword(password),
        uname: username,
        is_admin: isAdmin
    })

    User.sync()
 }