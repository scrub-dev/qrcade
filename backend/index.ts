import { initialiseDatabase } from "@lib/init/database";
import init from "@lib/init/init";
import { Server } from "src/server/server";

/**
 * WELCOME TO QRCADE BACKEND SERVICE
 * THIS FILE IS THE ENTRY POINT TO LAUNCH THE BACKEND SERVICE FOR QRCADE
 * THE CONFIG DIRECTORY PROVIDES SYSTEMS CONTROLS TO DECIDE THE BEHAVIOUR OF THE BACKEND
 */


const main = () => {
    init()
    initialiseDatabase()

    const server = new Server()


    // create server, start server
}
main()
