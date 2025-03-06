import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert, Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Layout from "../../components/Layout";
import { useAuth } from "../../providers/AuthProvider";
import { fetchFromAPI } from "../../utils/api";

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetchFromAPI("/auth/sign-in", {
                method: "POST",
                body: JSON.stringify({ login, password }),
            });

            if (response.token) {
                authLogin(response.token);
                navigate("/"); // Перенаправляем после успешного входа
            } else {
                throw new Error(t("error.unknown"));
            }
        } catch (err: any) {
            if (err.status === 401) {
                setError(t("error.unauthorized"));
            } else if (err.status === 404) {
                setError(t("error.notFound"));
            } else if (err.status === 500) {
                setError(t("error.serverError"));
            } else {
                setError(t("error.unknown") + " " + err.message);
            }
            setOpen(true);
        }
    };


    return (
        <Layout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo} alt={`${t("app.name")} Logo`} style={{ width: 300, marginBottom: 8 }} />
                    <Typography variant="h5">{t("login.title")}</Typography>
                    <TextField
                        label={t("login.username")}
                        fullWidth
                        margin="normal"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <TextField
                        label={t("login.password")}
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                        {t("login.button")}
                    </Button>
                </Box>
                <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ top: "100px" }} onClose={() => setOpen(false)}>
                    <Alert severity="error" onClose={() => setOpen(false)}>{error}</Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default LoginPage;
