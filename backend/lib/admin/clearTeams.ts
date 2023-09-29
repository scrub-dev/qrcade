import { Op } from "sequelize"
import { User } from "../../models/user.js"

export default async () => {
    await User.update({team: null}, {where: {team : {[Op.ne] : null}}})
}