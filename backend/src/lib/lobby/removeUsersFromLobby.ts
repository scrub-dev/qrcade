import { sequelize } from "../database/database.js"

export default async (lobbyID: string) => {
    await sequelize.models.Users.update({LobbyID: null, TeamID: null}, {where: {LobbyID: lobbyID}})
}