import { sequelize } from "@lib/database/database.js"
import { IUser } from "@src/models/user"
import { Sequelize, WhereOptions, Op } from "sequelize"

export const getUserByID = async (id: string) => {
    return (await getUserByFilter({UserID: id}))
}
export const getUserByUsername = async (name: string) => {
    return (await sequelize.models.Users.findOne({where: {Username: name}})) as unknown
}
export const getUsersInLobbyByLobbyID = async (lobbyID: string) => {

}
export const getUsersByFilter = async (filter: WhereOptions) => {

    return (await sequelize.models.Users.findAll({where: filter}))
}

export const getUserByFilter = async (filter: WhereOptions) => {
    return (await sequelize.models.Users.findOne({where: filter}))
}

export const getHighestUserPlayerNumber = async () => {
    return (await getUsersByFilter({Username: {[Op.like] : "Player%"}})).length + 1
}
export const getUserCount = async () => {
    return (await sequelize.models.Users.count({distinct: true, col: "UserID"}))
}