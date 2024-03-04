import { sequelize } from "@lib/database/database.js"
import createLobbyID from "@lib/lobby/createLobbyID.js"

export default async (opts: {
    LobbyName: string,
    LobbyType: string,
}) => {
    const x = sequelize.models.Lobbies.create({
        LobbyID: createLobbyID(sequelize),
        LobbyName: opts.LobbyName,
        LobbyType: opts.LobbyType
    })
    return (await x)
}
