import axios from "axios";
import location from './location'

const _request = (obj?: {cookie?: boolean}) => axios.create({
    baseURL: location.backend,
    withCredentials: (obj?.cookie) ? obj.cookie : true
})

export const requestWithoutCookie = () => _request({cookie: false})
export const requestWithCookie    = () => _request({cookie: true})

export default {
    request: _request,
    post   : (str: string, obj?: {cookie?: boolean, data: any}) => _request(obj).post(`${location.backend}/${str}`, obj?.data),
    get    : (str: string, obj?: {cookie?: boolean, data: any}) => _request(obj).get(`${location.backend}/${str}`, obj?.data),
    patch  : (str: string, obj?: {cookie?: boolean, data: any}) => _request(obj).patch(`${location.backend}/${str}`, obj?.data),
    delete : (str: string, obj?: {cookie?: boolean, data: any}) => _request(obj).delete(`${location.backend}/${str}`, obj?.data),
}
