import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const withAuthProtection = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredRole?: "admin" | "librarian" | "reader"
) => {
    const ProtectedComponent: React.FC<P> = (props) => {
        const { user } = useAuth();
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        if (requiredRole && user.role !== requiredRole) {
            return <Navigate to="/" replace />;
        }
        return <WrappedComponent {...props} />;
    };

    return ProtectedComponent;
};

export default withAuthProtection;
