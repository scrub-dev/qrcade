import path from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";

export default {
    DATABASE_NAME: "db.sqlite",
    DATABASE_LOCATION: cwd() + `${path.sep}build${path.sep}database${path.sep}db.sqlite`
}