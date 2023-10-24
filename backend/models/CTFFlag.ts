import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class CTFFlag extends Model {}
CTFFlag.init({
    id: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    assigned_team: {type: DataTypes.STRING, allowNull: false}
}, {sequelize, modelName: 'ctf_flags'})