import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number;
    login: string;
    name: string;
    role: "admin" | "librarian" | "reader";
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAdmin: () => boolean;
    isLibrarian: () => boolean;
    isReader: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getUserFromToken = (): User | null => {
        const token = Cookies.get("token");
        if (!token) return null;

        try {
            const decoded: any = jwtDecode(token);
            return {
                id: decoded.id,
                login: decoded.login,
                name: decoded.name,
                role: decoded.role,
                avatar: decoded.avatar,
            };
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
            return null;
        }
    };

    useEffect(() => {
        const storedUser = getUserFromToken();
        if (storedUser) {
            setUser(storedUser);
        }
        setIsLoading(false); // Завершаем загрузку после получения данных
    }, []);

    const login = (token: string) => {
        try {
            const decoded: any = jwtDecode(token);
            if (!decoded.exp) throw new Error("Токен не содержит информацию о сроке действия");

            const expirationTime = decoded.exp * 1000; // Преобразуем в миллисекунды
            const now = Date.now();
            const expiresInHours = (expirationTime - now) / (1000 * 60 * 60); // Считаем часы

            if (expiresInHours > 0) {
                Cookies.set("token", token, { expires: expiresInHours / 24 }); // Переводим в дни
                setUser(getUserFromToken());
            } else {
                console.error("Срок действия токена уже истек.");
                logout();
            }
        } catch (error) {
            console.error("Ошибка обработки токена:", error);
            logout();
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("token");
        navigate("/");
    };

    const isAdmin = () => user?.role === "admin";
    const isLibrarian = () => user?.role === "librarian";
    const isReader = () => user?.role === "reader";

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isLibrarian, isReader }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
