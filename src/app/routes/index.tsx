// Libraries
import React from "react";
import { Navigate, Route as ReactRoute, Routes as ReactRoutes } from "react-router-dom";
import LogInPage from "./pages/login-page";
import RegisterPage from "./pages/signup-page";
import MainPage from "./pages/main-page";
import AdminPage from "./pages/admin-page";
import LibrarianPage from "./pages/librarian-page";
import withAuthProtection from "./ProtectedRoute";
import withAuthRedirect from "./AuthRedirect";
import { useAuth } from "../../providers/AuthProvider";

// Обертка для защищенных маршрутов
const ProtectedAdminPage = withAuthProtection(AdminPage, "admin");
const ProtectedLibrarianPage = withAuthProtection(LibrarianPage, "librarian");

// Обертка для редиректа авторизованных пользователей
const RedirectedLoginPage = withAuthRedirect(LogInPage);
const RedirectedRegisterPage = withAuthRedirect(RegisterPage);

const routes = [
    { path: "/", element: <MainPage /> },
    { path: "/login", element: <RedirectedLoginPage /> },
    { path: "/register", element: <RedirectedRegisterPage /> },
    { path: "/admin", element: <ProtectedAdminPage /> },
    { path: "/librarian", element: <ProtectedLibrarianPage /> },
    { path: "*", element: <Navigate to="/" replace /> }
];

const Routes: React.FC = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Пока загружается пользователь — не рендерим маршруты
    }

    return (
        <ReactRoutes>
            {routes.map(route => (
                <ReactRoute key={route.path} path={route.path} element={route.element} />
            ))}
        </ReactRoutes>
    );
};

export default Routes;
