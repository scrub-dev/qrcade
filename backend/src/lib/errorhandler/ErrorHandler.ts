import { Log } from "@lib/logging/log.js"

export class ErrorHandler {
    static Error = (e: Error | string) => {
        if(typeof e === 'string') e = new Error(e)
        throw e
    }
}