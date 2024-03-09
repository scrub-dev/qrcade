import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Hit = seq.define('Hits', {
        HitID: {type: DataTypes.STRING, primaryKey: true}
    })
    return Hit
}