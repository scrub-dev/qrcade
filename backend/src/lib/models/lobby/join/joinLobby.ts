import { sequelize } from "@src/lib/database/database.js"

export const joinLobby = async (userID: string, lobbyID: string) => {
    await sequelize.models.Users.update({LobbyID: lobbyID}, {where: {UserID: userID}})
}