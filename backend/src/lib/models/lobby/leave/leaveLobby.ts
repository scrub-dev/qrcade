import { sequelize } from "@src/lib/database/database.js"

export const leaveLobby = async (userID: string) => {
    await sequelize.models.Users.update({LobbyID: null, TeamID: null}, {where: {UserID: userID}})
}