import { sequelize } from "@src/lib/database/database.js"

export const getTeamParticipants = (teamID: string) => {
    return sequelize.models.Users.findAll({where: {TeamID: teamID}})
}
export const getTeamByID = (teamID: string) => {
    return sequelize.models.Teams.findOne({where: {TeamID: teamID}})
}