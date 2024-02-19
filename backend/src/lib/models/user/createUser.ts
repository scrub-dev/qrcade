import createUserID from "@lib/user/createUserID.js"
import hashPassword from "@lib/user/hashPassword.js"
import { Sequelize } from "sequelize"


const createUser = async (s: Sequelize, opts: {
    userName    : string,
    displayName?: string,
    passwd      : string,
    admin?      : boolean
}) => {
    s.models.Users.create({
        UserID: createUserID(s),
        Username: opts.userName,
        DisplayName: opts.displayName || opts.userName,
        Passwd: await(hashPassword(opts.passwd)),
        Admin: opts.admin || false
    })
}

export const createDefaultUser = async (s: Sequelize) => {
    createUser(s, {
        userName: "DefaultUser",
        passwd: "DefaultPassword123",
        admin: true
    })
}

export default createUser
