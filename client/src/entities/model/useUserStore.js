import { create } from 'zustand';
import UserService from '../../features/api/userService';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

export const useUserStore = create(devtools((set, get) => ({
    users: [],
    isLoading: false,
    error: null,

    setUsers: (users) => {
        console.log('setUsers called with:', users);
        set({ users });
    },
    
    setLoading: (bool) => {
        console.log('setLoading called with:', bool);
        set({ isLoading: bool });
    },
    
    setError: (error) => {
        console.log('setError called with:', error);
        set({ error });
    },

    fetchUsers: async () => {
        console.log('fetchUsers called, setting isLoading to true');
        set({ isLoading: true, error: null });
        
        try {
            const response = await UserService.getAll();
            console.log('Fetch users response:', response);
            
            set({ users: response.data });
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const errorMessage = e.response?.data?.message || 'Ошибка при получении пользователей';
                console.log(errorMessage);
                set({ error: errorMessage });
            } else {
                set({ error: 'Неизвестная ошибка при получении пользователей' });
            }
            throw e;
        } finally {
            console.log('Finally block in fetchUsers, setting isLoading to false');
            set({ isLoading: false });
        }
    }
})));
