import {create} from 'zustand'
import AuthService from '../../features/api/authService'
import axios from 'axios'
import { API_URL, AUTH_ENDPOINTS, STORAGE_TOKEN_KEY } from '../../shared/config/api.config'
import {devtools} from 'zustand/middleware'

export const useStore = create(devtools((set, get) => ({
    user: {},
    isAuth: false,
    isLoading: false,

    setAuth: (bool) => {
        console.log('setAuth called with:', bool);
        set({ isAuth: bool });
    },
    setUser: (user) => {
        console.log('setUser called with:', user);
        set({ user });
    },
    setLoading: (bool) => {
        console.log('setLoading called with:', bool);
        set({ isLoading: bool });
        console.log('isLoading after set:', get().isLoading);
    },

    login: async (email, password) => {
        console.log('login called, setting isLoading to true');
        set({ isLoading: true });
        console.log('isLoading after set in login:', get().isLoading);
        
        try {
            const response = await AuthService.login(email, password)
            console.log('Login response:', response)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            
            console.log('Setting isAuth and user in login');
            set({ isAuth: true, user: response.data.user });
            
            return response.data.user // Возвращаем пользователя для возможности использования await
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e // Пробрасываем ошибку для обработки в компоненте
        } finally {
            console.log('Finally block in login, setting isLoading to false');
            set({ isLoading: false });
            console.log('isLoading after set in login finally:', get().isLoading);
        }
    },

    registration: async (email, password) => {
        set({ isLoading: true }) // Устанавливаем состояние загрузки
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
        } finally {
            set({ isLoading: false }) // Сбрасываем состояние загрузки в любом случае
        }
    },

    logout: async () => {
        set({ isLoading: true }) // Устанавливаем состояние загрузки
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
        } finally {
            set({ isLoading: false }) // Сбрасываем состояние загрузки в любом случае
        }
        //добавить редирект на главную страницу
    },

    checkAuth: async () => {
        console.log('checkAuth called, setting isLoading to true');
        set({ isLoading: true });
        console.log('isLoading after set in checkAuth:', get().isLoading);
        
        try {
            const response = await axios.get(`${API_URL}/${AUTH_ENDPOINTS.REFRESH}`, {withCredentials: true})
            console.log('Check auth response:', response)
            localStorage.setItem(STORAGE_TOKEN_KEY, response.data.accessToken)
            
            console.log('Setting isAuth and user in checkAuth');
            set({ isAuth: true, user: response.data.user });
            
            return response.data.user
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
            throw e
        } finally {
            console.log('Finally block in checkAuth, setting isLoading to false');
            set({ isLoading: false });
            console.log('isLoading after set in checkAuth finally:', get().isLoading);
        }
    }
})))
