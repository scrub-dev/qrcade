import { sequelize } from "@src/lib/database/database"
import createTeamID from "@src/lib/lobby/createTeamID"

export default async (teamName: string, teamColour: string) => {

    let newTeam = sequelize.models.Teams.create({
        TeamID: createTeamID(sequelize),
        TeamName: teamName,
        TeamColour: teamColour
    })

    return (await newTeam)
}