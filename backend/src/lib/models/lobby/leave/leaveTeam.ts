import { sequelize } from "@src/lib/database/database.js"

export const leaveTeam = async (userID: string) => {
    await sequelize.models.Users.update({TeamID: null}, {where: {UserID: userID}})
}