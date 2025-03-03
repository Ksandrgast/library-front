import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    IconButton,
    TextField,
    Button
} from "@mui/material";
import { AddCircle, Save, Cancel, Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { fetchFromAPI } from "../../utils/api";

const AdminPage: React.FC = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<any | null>(null);
    const [newCategory, setNewCategory] = useState<any | null>(null);
    const [newLocation, setNewLocation] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchFromAPI("/categories");
                setCategories(categoriesData);
            } catch {
                setError(t("error.fetchCategoriesFailed"));
            }

            try {
                const locationsData = await fetchFromAPI("/locations");
                setLocations(locationsData);
            } catch {
                setError(t("error.fetchLocationsFailed"));
            }

            setLoading(false);
        };
        fetchData();
    }, [t]);

    const handleSaveCategory = async () => {
        if (!newCategory) return;
        try {
            const savedCategory = await fetchFromAPI("/categories", { method: "POST", body: JSON.stringify(newCategory) });
            setCategories([...categories, savedCategory]);
            setNewCategory(null);
        } catch {
            setError(t("error.addCategoryFailed"));
        }
    };

    const handleSaveLocation = async () => {
        if (!newLocation) return;
        try {
            const savedLocation = await fetchFromAPI("/locations", { method: "POST", body: JSON.stringify(newLocation) });
            setLocations([...locations, savedLocation]);
            setNewLocation(null);
        } catch {
            setError(t("error.addLocationFailed"));
        }
    };

    const handleEdit = (id: string, data: any) => {
        setEditingId(id);
        setEditedData({ ...data });
    };

    const handleSave = async (id: string, type: string) => {
        try {
            await fetchFromAPI(`/${type}/${id}`, { method: "PUT", body: JSON.stringify(editedData) });
            if (type === "categories") {
                setCategories(categories.map(item => (item.id === id ? editedData : item)));
            } else {
                setLocations(locations.map(item => (item.id === id ? editedData : item)));
            }
            setEditingId(null);
        } catch {
            setError(t("error.updateFailed"));
        }
    };

    const handleDelete = async (id: string, type: string) => {
        try {
            await fetchFromAPI(`/${type}/${id}`, { method: "DELETE" });
            if (type === "categories") {
                setCategories(categories.filter(item => item.id !== id));
            } else {
                setLocations(locations.filter(item => item.id !== id));
            }
        } catch {
            setError(t("error.deleteFailed"));
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{t("categories.title")}</Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("categories.name")}</TableCell>
                            <TableCell>{t("categories.titleRu")}</TableCell>
                            <TableCell>{t("categories.titleKk")}</TableCell>
                            <TableCell>{t("categories.titleEn")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                {editingId === category.id ? (
                                    <>
                                        <TableCell><TextField value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} /></TableCell>
                                        <TableCell><TextField value={editedData.titleRu} onChange={(e) => setEditedData({ ...editedData, titleRu: e.target.value })} /></TableCell>
                                        <TableCell><TextField value={editedData.titleKk} onChange={(e) => setEditedData({ ...editedData, titleKk: e.target.value })} /></TableCell>
                                        <TableCell><TextField value={editedData.titleEn} onChange={(e) => setEditedData({ ...editedData, titleEn: e.target.value })} /></TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleSave(category.id, "categories")}><Save /></IconButton>
                                            <IconButton onClick={() => setEditingId(null)}><Cancel /></IconButton>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.titleRu}</TableCell>
                                        <TableCell>{category.titleKk}</TableCell>
                                        <TableCell>{category.titleEn}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(category.id, category)}><Edit /></IconButton>
                                            <IconButton onClick={() => handleDelete(category.id, "categories")}><Delete /></IconButton>
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        ))}
                        {newCategory && (
                            <TableRow>
                                <TableCell><TextField value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newCategory.titleRu} onChange={(e) => setNewCategory({ ...newCategory, titleRu: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newCategory.titleKk} onChange={(e) => setNewCategory({ ...newCategory, titleKk: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newCategory.titleEn} onChange={(e) => setNewCategory({ ...newCategory, titleEn: e.target.value })} /></TableCell>
                                <TableCell>
                                    <IconButton onClick={handleSaveCategory}><Save /></IconButton>
                                    <IconButton onClick={() => setNewCategory(null)}><Cancel /></IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => setNewCategory({ name: "", titleRu: "", titleKk: "", titleEn: "" })}>
                <AddCircle /> {t("categories.add")}
            </Button>

            <Typography variant="h4" gutterBottom>{t("locations.title")}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("locations.floor")}</TableCell>
                            <TableCell>{t("locations.room")}</TableCell>
                            <TableCell>{t("locations.row")}</TableCell>
                            <TableCell>{t("locations.shelf")}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.map((location) => (
                            <TableRow key={location.id}>
                                <TableCell>{location.floor}</TableCell>
                                <TableCell>{location.room}</TableCell>
                                <TableCell>{location.row}</TableCell>
                                <TableCell>{location.shelf}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(location.id, location)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(location.id, "locations")}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {newLocation && (
                            <TableRow>
                                <TableCell><TextField value={newLocation.floor} onChange={(e) => setNewLocation({ ...newLocation, floor: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newLocation.room} onChange={(e) => setNewLocation({ ...newLocation, room: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newLocation.row} onChange={(e) => setNewLocation({ ...newLocation, row: e.target.value })} /></TableCell>
                                <TableCell><TextField value={newLocation.shelf} onChange={(e) => setNewLocation({ ...newLocation, shelf: e.target.value })} /></TableCell>
                                <TableCell>
                                    <IconButton onClick={handleSaveLocation}><Save /></IconButton>
                                    <IconButton onClick={() => setNewLocation(null)}><Cancel /></IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => setNewLocation({ floor: "", room: "", row: "", shelf: "" })}>
                <AddCircle /> {t("locations.add")}
            </Button>
        </Container>
    );
};

export default AdminPage;
