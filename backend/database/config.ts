import path from "path";
import { fileURLToPath } from "url";

export default  {
    DATABASE_DIR : path.dirname(fileURLToPath(import.meta.url)) + path.sep,
    DATABASE_NAME: "qrcade_db.db",

    TABLES: [
        {name: "USER" , columns: [
            {name: "uid",    attr: "INTEGER PRIMARY KEY"},
            {name: "passwd", attr:"TEXT NOT NULL"},
            {name: "uname",  attr: "TEXT NOT NULL"},
            {name: "is_admin",attr: "INTEGER NOT NULL"},
        ]},
        {name: "GAME" , columns: [
            {name: "uid" , attr: "INTEGER PRIMARY KEY"},
            {name: "name" , attr: "TEXT NOT NULL"},
            {name: "start_time" , attr: "TEXT NOT NULL"},
            {name: "end_time" , attr: "TEXT"}

        ]},
        {name: "HTIS" , columns: [
            {name: "game_name", attr: "TEXT NOT NULL"},
            {name: "player", attr: "INTEGER NOT NULL"},
            {name: "player_hit", attr: "INTEGER NOT NULL"},
            {name: "timestamp", attr: "INTEGER NOT NULL"}

        ]}
    ]
}