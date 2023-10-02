import axios from "axios"

const _httpWithCreds = axios.create({
    baseURL: (import.meta.env.PROD) ? "https://shooter.qrcade.xyz" : "http://localhost:3000",
    withCredentials: true
})

const _http = axios.create({
    baseURL: (import.meta.env.PROD) ? "https://shooter.qrcade.xyz" : "http://localhost:3000",
    withCredentials: false
})


export const getBackendURI = () => (import.meta.env.PROD) ? "https://shooter.qrcade.xyz" : "http://localhost:3000"

export const http = () => _http

export const httpWithCreds = () => _httpWithCreds
