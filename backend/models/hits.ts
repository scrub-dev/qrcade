import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class Hit extends Model {}
Hit.init({
    player: {type: DataTypes.INTEGER, allowNull: false},
    player_hit: {type: DataTypes.INTEGER, allowNull: false},
    timestamp: {type: DataTypes.TIME, allowNull: false}
}, {sequelize, modelName: 'hit'})