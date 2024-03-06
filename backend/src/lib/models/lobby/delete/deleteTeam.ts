import { sequelize } from "@src/lib/database/database.js"

export const deleteTeam = async (teamID: string) => {
    await sequelize.models.Users.update({TeamID: null}, {where: {TeamID: teamID}})
    return (await sequelize.models.Teams.destroy({where: {TeamID: teamID}}))
}

export const deleteLobbyTeams = async (lobbyID: string) => {
    await sequelize.models.Users.update({TeamID: null}, {where: {LobbyID: lobbyID}})
    return (await sequelize.models.Teams.destroy({where: {LobbyID: lobbyID}}))
}