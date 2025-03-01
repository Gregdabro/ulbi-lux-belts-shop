import { useEffect, useState } from "react";
import { useAuthStore } from "../../entities/model/useAuthStore";
import { STORAGE_TOKEN_KEY } from "../../shared/config/api.config";

export const AuthProvider = ({ children }) => {
    const { checkAuth } = useAuthStore();
    const isLoading = useAuthStore(state => state.isLoading);
    const [isInitializing, setIsInitializing] = useState(true);
    
    console.log('AuthProvider render, isLoading:', isLoading, 'isInitializing:', isInitializing);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_TOKEN_KEY);
        console.log('AuthProvider useEffect, token exists:', !!token);
        
        const initialize = async () => {
            try {
                if (token) {
                    console.log('AuthProvider calling checkAuth');
                    await checkAuth();
                }
            } catch (err) {
                console.error('Error in checkAuth:', err);
            } finally {
                console.log('Setting isInitializing to false');
                setIsInitializing(false);
            }
        };
        
        initialize();
    }, [checkAuth]);

    if (isInitializing || isLoading) {
        console.log('AuthProvider showing loader, isInitializing:', isInitializing, 'isLoading:', isLoading);
        return <div className="app-loader">Загрузка...</div>;
    }

    console.log('AuthProvider rendering children');
    return children;
};
