import { sequelize } from "@src/lib/database/database.js"
import createFlagID from "@src/lib/lobby/createFlagID.js"

export interface TCreateFlagFormProps {
    lobbyID: string,
    flagName: string,
    flagInfo: string,
    flagDesc: string
}
export default async (opts: TCreateFlagFormProps) => {
    let x = sequelize.models.Flags.create({
        FlagID: createFlagID(sequelize),
        LobbyID: opts.lobbyID,
        FlagName: opts.flagName,
        FlagInfo: opts.flagInfo,
        FlagDesc: opts.flagDesc
    })

    return (await x)
}