import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number;
    login: string;
    name: string;
    role: "admin" | "librarian" | "user";
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAdmin: () => boolean;
    isLibrarian: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_EXPIRATION = parseInt(process.env.REACT_APP_TOKEN_EXPIRATION || "1", 10); // По умолчанию 1 час

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
        Cookies.set("token", token, { expires: TOKEN_EXPIRATION / 24 });
        const loggedInUser = getUserFromToken();
        setUser(loggedInUser);
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("token");
        navigate("/");
    };

    const isAdmin = () => user?.role === "admin";
    const isLibrarian = () => user?.role === "librarian";

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin, isLibrarian }}>
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
