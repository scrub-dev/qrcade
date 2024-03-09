import { sequelize } from "@src/lib/database/database.js"
import createHitID from "@src/lib/hit/createHitID.js"

export const createSHOOTER_FFAHit = async (values: {
    lobby: string,
    scanner: string,
    scanned: string
}) => {
    // lobby, scanner, scanned
    return (await sequelize.models.Hits.create({
        HitID: createHitID(sequelize),
        LobbyID: values.lobby,
        ScannerID: values.scanner,
        ScannedUser: values.scanned
    }))
}

export const createSHOOTER_TDMHit = async (values: {
    lobby: string,
    scanner: string,
    scanned: string,
    team: string
}) => {
    // lobby, scanner, scanned, team
    return (await sequelize.models.Hits.create({
        HitID: createHitID(sequelize),
        LobbyID: values.lobby,
        ScannerID: values.scanner,
        ScannedUser: values.scanned,
        TeamID: values.team
    }))
}

export const createLOOTER_FFAHit = async (values: {
    lobby: string,
    scanner: string,
    flag: string
}) => {
    return (await sequelize.models.Hits.create({
        HitID: createHitID(sequelize),
        LobbyID: values.lobby,
        ScannerID: values.scanner,
        ScannedFlag: values.flag
    }))
}