import { Database } from "@lib/database/database.js"
import user from "./user.js"
import lobby from "./lobby.js"
import hit from "./hit.js"
import flag from "./flag.js"
import team from "./team.js"
import { Sequelize } from "sequelize"
import log from "./log.js"

export const models = () => [lobby,hit,flag,team,user]

export default async (s: Sequelize) => {

    const User  = user(s)
    const Lobby = lobby(s)
    const Hit   = hit(s)
    const Flag  = flag(s)
    const Team  = team(s)

    const Log = log(s)

    User.init
    Lobby.init

    Lobby.hasMany(User, {as: 'LobbyParticipants'})
    User.belongsTo(Lobby)

    Lobby.hasMany(Flag)
    Flag.belongsTo(Lobby)

    Lobby.hasMany(Team)
    Team.belongsTo(Lobby)
    Team.hasMany(User, {as: "TeamPlayers"})
    User.belongsTo(Team)

    // Hit.hasOne(User, {as: "Scanner"})
    // Hit.hasOne(User, {as: "ScannedPlayer"})
    // Hit.hasOne(Flag, {as: "ScannedFlag"})
}