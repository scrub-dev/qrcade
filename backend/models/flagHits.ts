import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class Flag extends Model {}
Flag.init({

    flag_id: {type: DataTypes.INTEGER, allowNull: false},
    player_id: {type: DataTypes.STRING, allowNull: false}

}, {sequelize, modelName: 'flag'})