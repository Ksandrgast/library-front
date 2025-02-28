import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserMenu: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "white" }}>
            {user ? (
                <>
                    <img src={user.avatar} alt="User avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    <div style={{ display: "grid" }}>
                        <Typography>{user.name}</Typography>
                        <Typography variant="body2">{user.role}</Typography>
                    </div>
                    <IconButton onClick={logout} sx={{ color: "white" }}>
                        <LogoutIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
                        {t("login.login")}
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#93C5FD", color: "#fff" }}
                            onClick={() => navigate("/register")}>
                        {t("login.register")}
                    </Button>
                </>
            )}
        </div>
    );
};

export default UserMenu;
