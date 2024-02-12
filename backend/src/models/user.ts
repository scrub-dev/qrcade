import { Database } from '@lib/database/database.js'
import { DataTypes, Model, Sequelize } from "sequelize";


class User extends Model {}

User.init({
    UserID: DataTypes.STRING,

}, {
    sequelize: (await Database.getInstance())
})