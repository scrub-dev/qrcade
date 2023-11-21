// export const RUN_TYPE = "DEVELOPMENT"
export const RUN_TYPE: string | "PRODUCTION" | "DEVELOPMENT" = "PRODUCTION"
export const ORIGIN =  (RUN_TYPE != "DEVELOPMENT") ? "http://localhost:5173" : "https://qrcade.xyz"