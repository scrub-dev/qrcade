import { sequelize } from "@src/lib/database/database.js"

export const getLobbyFlags = async (lobbyID: string) => {
    return (await sequelize.models.Flags.findAll({where: {LobbyID: lobbyID}}))
}