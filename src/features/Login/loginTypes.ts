//types auth
export type AuthStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
//types login
export type LoginStateType = {
    email: string | null
    password: string | null
    rememberMe: boolean
}