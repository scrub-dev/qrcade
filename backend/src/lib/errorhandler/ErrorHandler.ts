import { Log } from "@lib/logging/log"

export default (err: Error) => {
    Log(err.message)
    throw err
}