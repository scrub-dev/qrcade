import { sequelize } from "@src/lib/database/database.js"

export const getHitsByTeam = async (teamID: string) => {
    return (await sequelize.models.Hits.findAll({where: {TeamID: teamID}}))
}

// Gets the hits where the player is the scanner
export const getHitsByPlayer = async (playerID: string) => {
    return (await sequelize.models.Hits.findAll({where: {ScannerID: playerID}})).map(e => e.dataValues)
}

// Gets the hits where the player is the scanned
export const getHitsToPlayer = async (playerID: string) => {
    return (await sequelize.models.Hits.findAll({where: {ScannedUser: playerID}})).map(e => e.dataValues)
}

export const getHitsByLobby = async (lobbyID: string) => {
    return (await sequelize.models.Hits.findAll({where: {LobbyID: lobbyID}}))
}