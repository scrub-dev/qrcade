import { sequelize } from "@src/lib/database/database.js"

export const getTeamParticipants = async (teamID: string) => {
    return await sequelize.models.Users.findAll({where: {TeamID: teamID}})
}
export const getTeamByID = async (teamID: string) => {
    return await sequelize.models.Teams.findOne({where: {TeamID: teamID}})
}
export const getTeamsInLobby = async (lobbyID: string) => {
    return await sequelize.models.Teams.findAll({where: {LobbyID: lobbyID}})
}