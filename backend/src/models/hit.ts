import { DataTypes, Model, Sequelize } from "sequelize";

export default (seq: Sequelize) => {
    const Hit = seq.define('Hit', {
        HitID: DataTypes.STRING,
        Timestamp: DataTypes.DATE
    })
    return Hit
}