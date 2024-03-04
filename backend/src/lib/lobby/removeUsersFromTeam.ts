import { sequelize } from "@src/lib/database/database.js"

export default async (teamID: string) => {
    await sequelize.models.Users.update({TeamID: null}, {where: {TeamID: teamID}})
}