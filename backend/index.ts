import { initialiseDatabase } from "@lib/init/database.js";
import init from "@lib/init/init.js";
import path from "path";
import { Server } from "src/server/server.js";
import { fileURLToPath } from "url";
import express from 'express'
import { Database } from "@lib/database/database.js";
import {default as initUsers} from "@lib/init/users.js";

/**
 * WELCOME TO QRCADE BACKEND SERVICE
 * THIS FILE IS THE ENTRY POINT TO LAUNCH THE BACKEND SERVICE FOR QRCADE
 * THE CONFIG DIRECTORY PROVIDES SYSTEMS CONTROLS TO DECIDE THE BEHAVIOUR OF THE BACKEND
 */

const main = async () => {
    init()

    const databaseLocation = path.dirname(fileURLToPath(import.meta.url)) + `${path.sep}`
    await initialiseDatabase(databaseLocation)

    Database.getInstance().then(instance => initUsers(instance))

    const app    = express()
    const server = new Server(app)
    server.listen()

}
main()