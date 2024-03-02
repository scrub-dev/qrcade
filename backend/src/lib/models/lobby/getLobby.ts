import { sequelize } from "@src/lib/database/database.js"

export const getLobbyByID = async (lobbyID: string) => {
    return (await sequelize.models.Lobbies.findOne({where: {LobbyID: lobbyID}}))
}
export const getLobbyByName= async (name: string) => {
    return (await sequelize.models.Lobbies.findOne({where: {LobbyName: name}}))?.dataValues
}
export const getLobbyType = async (lobbyID: string) => {
    return (await getLobbyByID(lobbyID))?.dataValues.LobbyType
}
export const getLobbyParticipants = async (lobbyID: string) => {
    return (await sequelize.models.Users.findAll({where: {LobbyID: lobbyID}}))
}
export const getLobbyTeams = async (lobbyID: string) => {
    return (await sequelize.models.Teams.findAll({where: {LobbyID: lobbyID}}))
}
export const getLobbyFlags = async (lobbyID: string) => {
    return (await sequelize.models.Flags.findAll({where: {LobbyID: lobbyID}}))
}

export const getAllLobbies = async () => {
    return (await sequelize.models.Lobbies.findAll())
}