import React, { ReactNode, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { i18n } = useTranslation();
    const [languageLoaded, setLanguageLoaded] = useState(false);

    useEffect(() => {
        const savedLanguage = Cookies.get("lang");
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage).then(() => {
                setLanguageLoaded(true);
            });
        } else {
            setLanguageLoaded(true);
        }

    }, [i18n]); // Добавляем i18n

    if (!languageLoaded) return null;

    return (
        <>
            <Header />
            <Container sx={{ mt: 2 }}>
                {children}
            </Container>
        </>
    );
};

export default Layout;
