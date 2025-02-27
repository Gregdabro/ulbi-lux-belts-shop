import { useEffect } from "react";
import { useStore } from "../../entities/model/useStore";
import { STORAGE_TOKEN_KEY } from "../../shared/config/api.config";

export const AuthProvider = ({ children }) => {
    const { checkAuth, isLoading } = useStore();

    useEffect(() => {
        if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
            checkAuth()
        }
    }, [checkAuth])

    if (isLoading) {
        return <div className="app-loader">Загрузка...</div>;
    }

    return children;
};
