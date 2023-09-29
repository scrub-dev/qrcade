import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class Hit extends Model {}
Hit.init({

    player: {type: DataTypes.INTEGER, allowNull: false},
    player_hit: {type: DataTypes.INTEGER, allowNull: false},
    team: {type: DataTypes.STRING, allowNull: true}

}, {sequelize, modelName: 'hit'})