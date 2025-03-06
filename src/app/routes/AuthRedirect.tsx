import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const withAuthRedirect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
        const { user } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (user) {
                navigate("/");
            }
        }, [user, navigate]);

        return user ? null : <WrappedComponent {...props} />;
    };
};

export default withAuthRedirect;
