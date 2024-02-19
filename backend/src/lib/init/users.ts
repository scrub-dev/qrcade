import { Log, LogType } from "@lib/logging/log.js";
import createUser, { createDefaultUser } from "@lib/models/user/createUser.js";
import config from "@config/InitConfig.json" assert {type: "json"}
import gameConfig from "@config/GameConfig.json" assert {type: "json"}
import { getUserCount } from "@lib/models/user/getUser.js";

import { Sequelize } from "sequelize";


export default (s: Sequelize) => {
    createDefaultUser(s).then(() => {Log("Created default user...", LogType.INI)})

    if(config.PERSIST_DB && config.GENERATE_ACCOUNTS) return Log("Skipping generating accounts, database persisted")

    if(config.GENERATE_ACCOUNTS) {
        const ACCOUNTS_COUNT = 10
        const PLAYER_UNAME_PREFIX = gameConfig.PLAYER.DEFAULT_NAME
        const PLAYER_PWORD_PREFIX = gameConfig.PLAYER.DEFAULT_PASSWD


        let promiseArr: any[] = []
        for(let i = 0; i < 10; i++) {
            let _uname = `${PLAYER_UNAME_PREFIX}${i + 1}`
            let _pword = `${PLAYER_PWORD_PREFIX}${i + 1}`
            let promise = createUser(s, {
                userName: _uname,
                passwd: _pword,
                admin: false
            })
            promiseArr.push(promise)
        }

        Promise.all(promiseArr).then(async () => {
            let userCount = await getUserCount(s)
            Log(`Default Accounts Created: ${ACCOUNTS_COUNT} | Total Users: ${userCount}`, LogType.INI)
        })
    }
}