import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class Flag extends Model {}
Flag.init({

    id: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}

}, {sequelize, modelName: 'flags'})