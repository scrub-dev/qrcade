import { sequelize } from "@src/lib/database/database.js"

export const joinTeam = async (userID: string, teamID: string) => {
    await sequelize.models.Users.update({TeamID: teamID}, {where: {UserID: userID}})
}