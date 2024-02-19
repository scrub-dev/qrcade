import { Sequelize, WhereOptions, Op } from "sequelize"

export const getUserByID = async (s: Sequelize, id: string) => {
    return (await getUserByFilter(s, {UserID: id}))
}
export const getUserByUsername = async (s: Sequelize, name: string) => {
    return (await getUserByFilter(s, {Username: name}))
}
export const getUsersInLobbyByLobbyID = async (s: Sequelize, lobbyID: string) => {

}
export const getUsersByFilter = async (s: Sequelize, filter: WhereOptions) => {
    return (await s.models.Users.findAll({where: filter}))
}

export const getUserByFilter = async (s: Sequelize, filter: WhereOptions) => {
    return (await s.models.Users.findOne({where: filter}))
}

export const getHighestUserPlayerNumber = async (s: Sequelize) => {
    return (await getUsersByFilter(s, {Username: {[Op.like] : "Player%"}})).length + 1
}
export const getUserCount = async (s: Sequelize) => {
    return (await s.models.Users.count({distinct: true, col: "UserID"}))
}