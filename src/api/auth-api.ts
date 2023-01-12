import axios from 'axios';
import {ResponseType} from "./types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f2dd651a-2476-438b-bb64-0318d3a97401'
    }

}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export type LoginParamsType = {
    email: string | null
    password: string | null
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    authMe() {
        const promise = instance.get<ResponseType<{ id: number, email: string, login: string }>>('/auth/me')
        return promise
    },
    login(params: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', params)
        return promise
    },
    logout() {
        const promise = instance.delete('auth/login')
        return promise
    }

}





