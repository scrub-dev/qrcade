import { sequelize } from "@src/lib/database/database.js"

export const getLobbyFlags = async (lobbyID: string) => {
    return (await sequelize.models.Flags.findAll({where: {LobbyID: lobbyID}}))
}

export const getFlagByID = async (flagID: string) => {
    return (await sequelize.models.Flags.findOne({where: {FlagID: flagID}})) as any
}