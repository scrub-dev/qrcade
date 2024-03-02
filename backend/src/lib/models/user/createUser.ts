import { sequelize } from "@lib/database/database.js"
import createUserID from "@lib/user/createUserID.js"
import hashPassword from "@lib/user/hashPassword.js"

const createUser = async (opts: {
    userName    : string,
    displayName?: string,
    passwd      : string,
    admin?      : boolean
}) => {
    const x = sequelize.models.Users.create({
        UserID: createUserID(sequelize),
        Username: opts.userName,
        DisplayName: opts.displayName || opts.userName,
        Passwd: hashPassword(opts.passwd),
        Admin: opts.admin || false
    })
    return (await x) as unknown
}

export const createDefaultUser = async () => {
    createUser({
        userName: "DefaultUser",
        passwd: "DefaultPassword123",
        admin: true
    })
}

export default createUser
