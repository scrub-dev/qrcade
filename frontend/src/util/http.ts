import axios from "axios"

const _httpWithCreds = axios.create({
    baseURL: (process.env.NODE_ENV === "production") ? "https://shooter.qrcade.xyz" : "http://localhost:3000",
    withCredentials: true
})

const _http = axios.create({
    baseURL: (process.env.NODE_ENV === "production") ? "https://shooter.qrcade.xyz" : "http://localhost:3000",
    withCredentials: false
})


export const getBackendURI = () => (process.env.NODE_ENV === "production") ? "https://shooter.qrcade.xyz" : "http://localhost:3000"

export const http = () => _http

export const httpWithCreds = () => _httpWithCreds
