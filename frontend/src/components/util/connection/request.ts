import axios from "axios";
import location from './location'

const _request = (obj?: {cookie?: boolean}) => axios.create({
    baseURL: location.backend,
    withCredentials: (obj?.cookie) ? obj.cookie : true
})

export const requestWithoutCookie = () => _request({cookie: false})
export const requestWithCookie    = () => _request({cookie: true})

export default _request
