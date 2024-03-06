import { sequelize } from "@src/lib/database/database.js"
import createTeamID from "@src/lib/lobby/createTeamID.js"

export default async (teamName: string, teamColour: string, lobbyID: string) => {

    let newTeam = sequelize.models.Teams.create({
        TeamID: createTeamID(sequelize),
        TeamName: teamName,
        TeamColour: teamColour,
        LobbyID: lobbyID
    })

    return (await newTeam)
}