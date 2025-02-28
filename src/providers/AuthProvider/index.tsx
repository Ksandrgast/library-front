import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface User {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Функция для получения и декодирования токена
    const getUserFromToken = (): User | null => {
        const token = Cookies.get("token"); // Получаем JWT токен из куков
        if (!token) return null; // Если токена нет, возвращаем null

        try {
            // Симулируем декодирование токена (в реальном коде используй jwt-decode)
            const mockUser: User = {
                id: 1,
                name: "Сидоров Иван",
                role: "admin", // или "user"
                avatar: "https://via.placeholder.com/40", // Заглушка для аватара
            };

            return mockUser;
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
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        Cookies.set("token", "mocked.jwt.token", { expires: 1 }); // Устанавливаем фейковый токен
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("token");
        navigate("/");
    };

    const isAdmin = () => user?.role === "admin";

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
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
