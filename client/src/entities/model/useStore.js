import {create} from 'zustand'
import AuthService from '../../features/api/authService'
import axios from 'axios'
import { API_URL, AUTH_ENDPOINTS, STORAGE_TOKEN_KEY } from '../../shared/config/api.config'
import {devtools} from 'zustand/middleware'

export const useStore = create(devtools((set) => ({
    user: {},
    isAuth: false,
    isLoading: false,

    setAuth: (bool) => set({ isAuth: bool }),
    setUser: (user) => set({ user }),
    setLoading: (bool) => set({ isLoading: bool }),

    login: async (email, password) => {
        try {
            const response = await AuthService.login(email, password)
            console.log('Login response:', response)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            set({ isAuth: true, user: response.data.user })
            return response.data.user // Возвращаем пользователя для возможности использования await
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e // Пробрасываем ошибку для обработки в компоненте
        }
    },

    registration: async (email, password) => {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            set({ isAuth: true, user: response.data.user })
            return response.data.user
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e
        }
    },

    logout: async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem(STORAGE_TOKEN_KEY)
            set({ isAuth: false, user: {} })
            return true
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e
        }
        //добавить редирект на главную страницу
    },

    checkAuth: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get(`${API_URL}/${AUTH_ENDPOINTS.REFRESH}`, {withCredentials: true})
            console.log('Check auth response:', response)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            set({ isAuth: true, user: response.data.user })
            return response.data.user
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e
        } finally {
            set({ isLoading: false })
        }
    }
})))
