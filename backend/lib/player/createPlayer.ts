import { User } from "../../models/user.js"

 export default async (username: string, password: string, id: number, isAdmin: boolean) => {
    User.create({
        id: id,
        pword: password,
        uname: username,
        is_admin: isAdmin
    })
 }