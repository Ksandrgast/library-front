import React, {useCallback, useState} from "react";
import {
    AppBar, Toolbar, Typography, TextField, InputAdornment, IconButton, Menu, Button, MenuItem, Select, SelectChangeEvent, Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import UserMenu from "../UserMenu";
import Cookies from "js-cookie";
import { useAuth } from "../../providers/AuthProvider";

interface Category {
    id: number;
    name: string;
    translations: { [key: string]: string };
}

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [categories] = useState<Category[]>([
        { id: 1, name: "fiction", translations: { en: "Fiction", ru: "Художественная литература", kk: "Көркем әдебиет" } },
        { id: 2, name: "science", translations: { en: "Science", ru: "Наука", kk: "Ғылым" } },
        { id: 3, name: "history", translations: { en: "History", ru: "История", kk: "Тарих" } },
        { id: 4, name: "technology", translations: { en: "Technology", ru: "Технологии", kk: "Технологиялар" } }
    ]);
    const { isAdmin } = useAuth();

    const isFiltered = Boolean(searchQuery || new URLSearchParams(location.search).get("category"));

    const changeLanguage = (event: SelectChangeEvent) => {
        const newLanguage = event.target.value;
        i18n.changeLanguage(newLanguage);
        Cookies.set("lang", newLanguage, { expires: 1 });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery(""); // Очищаем состояние поиска
        navigate(location.pathname.startsWith("/admin") ? "/admin" : "/");
    };

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleCategorySelect = (category: string) => {
        const params = new URLSearchParams(location.search);
        params.set("category", category);
        navigate(location.pathname.startsWith("/admin") ? `/admin?${params.toString()}` : `/?${params.toString()}`);
        setMenuAnchor(null);
    };

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams(location.search);
        if (searchQuery) {
            params.set("search", searchQuery);
        }

        navigate(location.pathname.startsWith("/admin") ? `/admin?${params.toString()}` : `/?${params.toString()}`);
    }, [location.pathname,location.search, navigate, searchQuery]);

    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", px: 2, gap: 2 }}>
                {/* Кнопка меню */}
                <Button onClick={handleMenuOpen} sx={{ color: "white" }}>
                    <MenuIcon />
                </Button>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                    {categories.map((category) => (
                        <MenuItem key={category.id} onClick={() => handleCategorySelect(category.name)}>
                            <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
                            {category.translations[i18n.language] || category.name}
                        </MenuItem>
                    ))}
                    {isAdmin() && [
                        <Divider key="divider" />,
                        <MenuItem key="admin-panel" onClick={() => navigate("/admin")}>
                            <AdminPanelSettingsIcon fontSize="small" sx={{ mr: 1 }} />
                            {t("admin.panel")}
                        </MenuItem>
                    ]}
                </Menu>

                {/* Название приложения */}
                <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    {t("app.name")}
                </Typography>

                {/* Поле поиска */}
                <TextField
                    label={t("mainPage.search")}
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    sx={{ backgroundColor: "white", borderRadius: 1, flexGrow: 1, maxWidth: "60%" }}
                    InputProps={{
                        endAdornment: isFiltered && (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {/* Переключение языка */}
                <Select
                    value={i18n.language}
                    onChange={changeLanguage}
                    sx={{ color: "white", backgroundColor: "transparent", mx: 2 }}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="ru">Русский</MenuItem>
                    <MenuItem value="kk">Қазақша</MenuItem>
                </Select>

                {/* Меню пользователя */}
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
