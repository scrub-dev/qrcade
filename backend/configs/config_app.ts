import { TDevOptions } from "./types.js";

export const DEV_OPTIONS: TDevOptions = {
    DEV_MODE: true,
    PERSIST_DB: true,
    PRINT_DEBUG_MESSAGES: true,
    SERVER_LOGGING: true,
    VERBOSE_SERVER_LOGGING: true,
    LOG_HITS: false,
    TEST_USER: false
}

export const DEPLOYMENT_OPTIONS = {
    DEVELOPMENT: true
}

export const getFrontentURI = () => DEPLOYMENT_OPTIONS.DEVELOPMENT ? "http://localhost:5000" : "http://qrcade.xyz"