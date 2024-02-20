import path from "node:path";
import { fileURLToPath } from "node:url";

export default {
    DATABASE_NAME: "database.sqlite",
    DATABASE_LOCATION: path.dirname(fileURLToPath(import.meta.url)) + `${path.sep}..${path.sep}`
}