import config from './config.js'
import Database from 'better-sqlite3'

export default () => {
    let conn = new Database(config.DATABASE_DIR + config.DATABASE_NAME)
    conn.pragma('journal_mode = WAL')
    return conn
}