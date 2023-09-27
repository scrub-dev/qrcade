import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'
import { TUser } from '../configs/types.js'

export class User extends Model {
    [x: string]: any
}
User.init({
    id : {type: DataTypes.INTEGER,allowNull: false, primaryKey: true},
    pword: {type: DataTypes.STRING,allowNull: false},
    uname: {type: DataTypes.STRING,allowNull: false},
    is_admin: {type: DataTypes.BOOLEAN,allowNull: false},
    team : {type: DataTypes.STRING}
}, {sequelize, modelName: 'user'})