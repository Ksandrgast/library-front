import React, { useState, useCallback } from "react";
import { TextField, Button, Snackbar, Alert, Container, Box, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../../utils/api";
import Layout from "../../components/Layout";
import {PatternFormat} from "react-number-format";
import {useAuth} from "../../providers/AuthProvider";

const RegisterPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        login: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = useCallback(async () => {
        if (!formData.login || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            setError(t("error.requiredFields"));
            setOpen(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetchFromAPI("/auth/sign-up", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            if (response.success && response.token) {
                login(response.token); // Сохраняем токен в `AuthContext`
                navigate("/"); // Перенаправление в корень
            } else {
                throw new Error(response.message || t("register.error"));
            }
        } catch (err: any) {
            if (err.response?.status === 400) {
                setError(t("error.invalidData"));
            } else if (err.response?.status === 409) {
                setError(t("error.usernameExists"));
            } else {
                setError(err instanceof Error ? err.message : t("register.error"));
            }
            setOpen(true);
        } finally {
            setLoading(false);
        }
    }, [formData, navigate, t, login]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleRegister();
    };

    return (
        <Layout>
            <Container maxWidth="xs">
                <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h5">{t("register.title")}</Typography>

                    {/* Блок учетных данных */}
                    <Typography variant="subtitle1" sx={{ alignSelf: "flex-start", mt: 2 }}>
                        {t("register.credentials")}
                    </Typography>
                    <TextField label={t("register.login")} name="login" fullWidth margin="normal" value={formData.login} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <TextField label={t("register.password")} name="password" type="password" fullWidth margin="normal" value={formData.password} onChange={handleChange} onKeyDown={handleKeyDown} />

                    <Divider sx={{ my: 2 }} />

                    {/* Блок личных данных */}
                    <Typography variant="subtitle1" sx={{ alignSelf: "flex-start" }}>
                        {t("register.personalInfo")}
                    </Typography>
                    <TextField label={t("register.firstName")} name="firstName" fullWidth margin="normal" value={formData.firstName} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <TextField label={t("register.lastName")} name="lastName" fullWidth margin="normal" value={formData.lastName} onChange={handleChange} onKeyDown={handleKeyDown} />
                    <TextField label={t("register.email")} name="email" type="email" fullWidth margin="normal" value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} />
                    {/* Поле ввода телефона с маской */}
                    <PatternFormat
                        format="+7 (###) ###-##-##"
                        mask="_"
                        allowEmptyFormatting={false}
                        value={formData.phone}
                        onValueChange={(values) => setFormData({ ...formData, phone: values.value })}
                        onKeyDown={handleKeyDown}
                        customInput={TextField}
                        fullWidth
                        margin="normal"
                        label={t("register.phone")}
                        name="phone"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegister}
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? t("register.loading") : t("register.button")}
                    </Button>
                </Box>

                <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ top: "100px" }} onClose={() => setOpen(false)}>
                    <Alert severity="error" onClose={() => setOpen(false)}>{error}</Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default RegisterPage;
