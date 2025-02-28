import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert, Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import Layout from "../../components/Layout";

const LoginPage = () => {
    const { t } = useTranslation();

    // Инициализация стейтов перед любыми условиями
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
        if (login === "admin" && password === "password") {
            console.log(t("login.success"));
        } else {
            setError(t("login.error"));
            setOpen(true);
        }
    };

    return (
        <Layout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src={logo} alt={t("app.name") + " Logo"} style={{ width: 300, marginBottom: 8 }} />
                    <Typography variant="h5">{t("login.title")}</Typography>
                    <TextField
                        label={t("login.username")}
                        fullWidth
                        margin="normal"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Обработка Enter
                    />
                    <TextField
                        label={t("login.password")}
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Обработка Enter
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
                        {t("login.button")}
                    </Button>
                </Box>
                <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }}  style={{ top: "100px" }}  onClose={() => setOpen(false)}>
                    <Alert severity="error" onClose={() => setOpen(false)}>{error}</Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default LoginPage;
