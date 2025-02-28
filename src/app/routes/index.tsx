// Libraries
import React from "react";
import {Navigate, Route as ReactRoute, Routes as ReactRoutes} from "react-router-dom";

// Pages
import LogInPage from "./pages/login-page";
import MainPage from "./pages/main-page";
import UIKitsPage from "./pages/ui-kits-page";
import AdminPage from "./pages/admin-page";

const routes = [
    {path: '/', element: <MainPage/>},
    {path: '/login', element: <LogInPage/>},
    {path: '/admin', element: <AdminPage/>},
    {path: '/ui-kits', element: <UIKitsPage/>},
    {path: '*', element: <Navigate to="/" replace/>}
];

const Routes: React.FC = () => {
    return (
        <ReactRoutes>
            {routes.map(route => (
                <ReactRoute key={route.path} path={route.path} element={route.element}/>
            ))}
        </ReactRoutes>
    );
};

export default Routes;
