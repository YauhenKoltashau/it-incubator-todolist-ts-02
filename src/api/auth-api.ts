import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '26ffa3e6-cad0-4cf9-8170-904cae9d9ac2'
    }

}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authAPI = {
    authMe() {
        const promise = instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
        return promise
    },
    login(params:LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login',params)
        return promise
    },
    logout() {
        const promise = instance.delete('auth/login')
        return promise
    }

}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}





