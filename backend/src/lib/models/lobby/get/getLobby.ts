import { sequelize } from "@src/lib/database/database.js"
import sanitiseUser from "@src/lib/user/sanitiseUser.js"
import { IUser } from "@src/models/user.js"

export const getLobbyByID = async (lobbyID: string) => {
    return (await sequelize.models.Lobbies.findOne({where: {LobbyID: lobbyID}}))
}
export const getLobbyByName= async (name: string) => {
    return (await sequelize.models.Lobbies.findOne({where: {LobbyName: name}}))?.dataValues
}
export const getLobbyType = async (lobbyID: string) => {
    return (await getLobbyByID(lobbyID))?.dataValues.LobbyType
}
export const getAllLobbies = async () => {
    return (await sequelize.models.Lobbies.findAll())
}

export const getLobbyUsers = async (lobbyID: string) => {
    let users = (await sequelize.models.Users.findAll({where: {LobbyID: lobbyID}})).map(e => sanitiseUser(e.dataValues))
    return [users, (users.length) as number] as [IUser[], number]
}
export const getLobbyTeams = async (lobbyID: string) => {
    return (await sequelize.models.Teams.findAll({where: {LobbyID: lobbyID}}))
}
export const getLobbyFlags = async (lobbyID: string) => {
    return (await sequelize.models.Flags.findAll({where: {LobbyID: lobbyID}}))
}

export const getTeamUsers = async (teamID: string) => {
    let users = (await sequelize.models.Users.findAll({where: {TeamID: teamID}})).map(e => sanitiseUser(e.dataValues))
    return [users as IUser[], (users.length) as number]
}