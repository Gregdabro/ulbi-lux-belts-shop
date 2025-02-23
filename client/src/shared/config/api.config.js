export const API_URL = import.meta.env.VITE_API_URL
export const STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY

export const AUTH_ENDPOINTS = {
    LOGIN: 'auth/login',
    REGISTER: 'auth/registration',
    LOGOUT: 'auth/logout',
    REFRESH: 'auth/refresh',
    ACTIVATE: 'auth/activate'
}

export const PRODUCT_ENDPOINTS = {
    GET_ALL: '/products'
}

export const USER_ENDPOINTS = {
    GET_ALL: '/users'
}
