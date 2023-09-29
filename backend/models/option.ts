import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database/connection.js'

export class Option extends Model {
    [x: string]: any
}
Option.init({
    name : {type: DataTypes.STRING},
    value : {type: DataTypes.STRING},
}, {sequelize, modelName: 'option'})