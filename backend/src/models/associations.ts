import { sequelize } from "@lib/database/database.js"
import user from "./user.js"
import lobby from "./lobby.js"
import hit from "./hit.js"
import flag from "./flag.js"
import team from "./team.js"
import { Sequelize } from "sequelize"

export const models = () => [lobby,hit,flag,team,user]

export default async (s: Sequelize) => {

    const User  = user(s)
    const Lobby = lobby(s)
    const Hit   = hit(s)
    const Flag  = flag(s)
    const Team  = team(s)

    User.init
    Lobby.init
    Flag.init
    Team.init

    // Lobby.hasMany(User, {foreignKey: "LobbyID", as: ""})
    User.belongsTo(Lobby, {foreignKey: "LobbyID", as: ""})

    // Lobby.hasMany(Flag)
    Flag.belongsTo(Lobby, {foreignKey: "LobbyID", as: ""})

    // Lobby.hasMany(Team)
    Team.belongsTo(Lobby, {foreignKey: "LobbyID", as: ""})

    // Team.hasMany(User)
    User.belongsTo(Team, {foreignKey: "TeamID", as: ""})

    // Hit.hasOne(User, {as: "Scanner"})
    // Hit.hasOne(User, {as: "ScannedPlayer"})
    // Hit.hasOne(Flag, {as: "ScannedFlag"})

    Hit.belongsTo(User, {foreignKey: "ScannerID", as: ""})
    Hit.belongsTo(User, {foreignKey: "ScannedUser", as: ""})
    Hit.belongsTo(Lobby, {foreignKey: "LobbyID", as: ""})
    Hit.belongsTo(Flag, {foreignKey: "ScannedFlag", as: ""})
    Hit.belongsTo(Team, {foreignKey: "TeamID", as: ""})

}