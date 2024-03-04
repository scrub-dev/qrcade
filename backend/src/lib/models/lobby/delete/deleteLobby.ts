import { sequelize } from "@src/lib/database/database.js"

export const deleteLobby = async (lobbyID: string) => {
    return (await sequelize.models.Lobbies.destroy({where: {LobbyID: lobbyID}}))
}