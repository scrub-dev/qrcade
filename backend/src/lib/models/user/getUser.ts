import { Sequelize, WhereOptions, Op } from "sequelize"

export default (s: Sequelize) => {

}

export const getUserByID = async (s: Sequelize, id: string) => {

}
export const getUserByUsername = async (s: Sequelize, name: string) => {

}
export const getUsersInLobbyByLobbyID = async (s: Sequelize, lobbyID: string) => {

}
export const getUsersByFilter = async (s: Sequelize, filter: WhereOptions) => {
    return (await s.models.Users.findAll({where: filter}))
}
export const getHighestDefaultUserPlayerNumber = async (s: Sequelize) => {
    return (await getUsersByFilter(s, {Username: {[Op.like] : "Player%"}}))
}
export const getUserCount = async (s: Sequelize) => {
    return (await s.models.Users.count({distinct: true, col: "UserID"}))
}