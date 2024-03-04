import { sequelize } from "@src/lib/database/database.js"

export const deleteTeam = async (teamID: string) => {
    return (await sequelize.models.Teams.destroy({where: {TeamID: teamID}}))
}

export const deleteLobbyTeams = async (lobbyID: string) => {
    return (await sequelize.models.Teams.destroy({where: {LobbyID: lobbyID}}))
}