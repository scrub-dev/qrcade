import 'dotenv/config'
import { initialiseDatabase } from "@lib/init/database.js";
import init from "@lib/init/init.js";
import { Server } from "src/server/server.js";

import express from 'express'
import {default as initUsers} from "@lib/init/users.js";
import DatabaseConfig from "@config/DatabaseConfig.js";

/**
 * WELCOME TO QRCADE BACKEND SERVICE
 * THIS FILE IS THE ENTRY POINT TO LAUNCH THE BACKEND SERVICE FOR QRCADE
 * THE CONFIG DIRECTORY PROVIDES SYSTEMS CONTROLS TO DECIDE THE BEHAVIOUR OF THE BACKEND
 */

const main = async () => {
    init()

    await initialiseDatabase(DatabaseConfig.DATABASE_LOCATION)

    initUsers()

    const app    = express()
    const server = new Server(app)
    server.listen()
}
main()