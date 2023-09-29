import { Fonts, KerningMethods } from "figlet";

export interface TDevOptions {
    DEV_MODE: boolean
    PERSIST_DB: boolean,
    PRINT_DEBUG_MESSAGES: boolean,
    SERVER_LOGGING: boolean,
    VERBOSE_SERVER_LOGGING: boolean,
    LOG_HITS: boolean,
    TEST_USER: boolean
}

export interface TFigletOptions {
    font?: Fonts | undefined,
    horizontalLayout?: KerningMethods | undefined;
    verticalLayout?: KerningMethods | undefined;
}


export interface TTable {
    name: String
    columns: TTableColumn[]
}

export interface TTableColumn {
    name: String,
    attr: String
}

export interface TUser {
    id : Number
    passwd: String
    uname: String
    is_admin: Boolean
    team? : String
}

export interface TOption {
    name: string,
    value: string
}