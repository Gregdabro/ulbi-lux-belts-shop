import { useEffect } from "react";
import { useStore } from "../../entities/model/useStore";
import { STORAGE_TOKEN_KEY } from "../../shared/config/api.config";

export const AuthProvider = ({ children }) => {
    const { checkAuth } = useStore();

    useEffect(() => {
        if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
            checkAuth()
        }
    }, [checkAuth])

  return children;
};
