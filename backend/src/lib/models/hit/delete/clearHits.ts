import { sequelize } from "@src/lib/database/database.js"

export const clearAllHits = async () => {
    return (await sequelize.models.Hits.destroy({where: {}}))
}

export const clearLobbyHits = async (lobbyID: string) => {
    console.log("clearing lobby hits")
    return (await sequelize.models.Hits.destroy({where: {LobbyID: lobbyID}}))
}

export const clearTeamHits = async (teamID: string) => {
    console.log("clearing lobby hits")
    return (await sequelize.models.Hits.destroy({where: {TeamID: teamID}}))
}

export const clearUserHits = async (userID: string) => {
    console.log("clearing lobby hits")
    return (await sequelize.models.Hits.destroy({where: {ScannerID: userID}}))
}