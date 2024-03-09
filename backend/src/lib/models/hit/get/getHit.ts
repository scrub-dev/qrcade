import { sequelize } from "@src/lib/database/database.js"

export const getLobbyHits = async (lobbyID: string) => {
    return (await sequelize.models.Hits.findAll({where: {LobbyID: lobbyID}}))
}

export const getLastUserHitInLobby = async (lobbyID: string, userID: string) => {
    return (await sequelize.models.Hits.findOne({where: {LobbyID: lobbyID, ScannerID: userID}}))
}

export const getPlayerFlagHits = async (lobbyID: string, flagID: string, userID: string) => {
    return (await sequelize.models.Hits.findAll({where: {LobbyID: lobbyID, ScannerID: userID, ScannedID: flagID}}))
}

export const getTeamHits = async (lobbyID: string, teamID: string) => {
    return (await sequelize.models.Hits.findAll({where: {LobbyID: lobbyID, ScannerID: teamID}}))
}

export const isFlagDuplicate = async (userID: string, flagID: string) => {
    return !!(await sequelize.models.Hits.findOne({where: {ScannerID: userID, ScannedFlag: flagID}}))
}

export const getUsersLastHitTime = async (userID: string) => {
    let res =  (await sequelize.models.Hits.findAll({
        limit: 1,
        where: {ScannerID: userID},
        order: [['createdAt', 'DESC']]
    }))
    return res[0]?.dataValues.createdAt
}