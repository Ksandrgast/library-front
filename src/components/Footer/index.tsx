import React from "react";
import { Box, Typography } from "@mui/material";
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Box component="footer" sx={{
            textAlign: "center",
            padding: 2,
            backgroundColor: "#f5f5f5",
            marginTop: "auto"
        }}>
            <Typography variant="body1">{t("app.name")} &copy; {new Date().getFullYear()} All rights reserved</Typography>
            <Typography variant="body2">Developed by Tsukanov Alexandr</Typography>
        </Box>
    );
};

export default Footer;
