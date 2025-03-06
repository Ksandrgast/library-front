import React, {useState, useEffect} from "react";
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
    Button, Tabs, Tab, MenuItem, Select
} from "@mui/material";
import {AddCircle, Save, Cancel, Edit, Delete} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {fetchFromAPI} from "../../utils/api";
import Layout from "../../components/Layout";

const AdminPage: React.FC = () => {
    const {t} = useTranslation();
    const [categories, setCategories] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<any | null>(null);
    const [newCategory, setNewCategory] = useState<any | null>(null);
    const [newLocation, setNewLocation] = useState<any | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchFromAPI("/categories");
                setCategories(categoriesData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(t("error.fetchCategoriesFailed") + ": " + error.message);
                } else {
                    setError(t("error.fetchCategoriesFailed"));
                }
            }

            try {
                const locationsData = await fetchFromAPI("/locations");
                setLocations(locationsData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(t("error.fetchLocationsFailed") + ": " + error.message);
                } else {
                    setError(t("error.fetchLocationsFailed"));
                }
            }

            try {
                const usersData = await fetchFromAPI("/users");
                setUsers(usersData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(t("error.fetchUsersFailed") + ": " + error.message);
                } else {
                    setError(t("error.fetchUsersFailed"));
                }
            }

            setLoading(false);
        };
        fetchData();
    }, [t]);

    const handleSaveCategory = async () => {
        if (!newCategory) return;
        if (!newCategory.titleRu || !newCategory.titleKk || !newCategory.titleEn) {
            setError(t("error.requiredFields"));
            return;
        }
        try {
            const savedCategory = await fetchFromAPI("/categories", {
                method: "POST",
                body: JSON.stringify(newCategory)
            });
            setCategories([...categories, savedCategory]);
            setNewCategory(null);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(t("error.addCategoryFailed") + ": " + error.message);
            } else {
                setError(t("error.addCategoryFailed"));
            }
        }
    };

    const handleSaveLocation = async () => {
        if (!newLocation) return;
        if (!newLocation.floor || !newLocation.room || !newLocation.row || !newLocation.shelf) {
            setError(t("error.requiredFields"));
            return;
        }
        try {
            const savedLocation = await fetchFromAPI("/locations", {method: "POST", body: JSON.stringify(newLocation)});
            setLocations([...locations, savedLocation]);
            setNewLocation(null);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(t("error.addLocationFailed") + ": " + error.message);
            } else {
                setError(t("error.addLocationFailed"));
            }
        }
    };

    const handleEdit = (id: string, data: any) => {
        setEditingId(id);
        setEditedData({...data});
    };

    const handleCancel = () => {
        setEditingId(null);
        setNewCategory(null);
        setNewLocation(null);
        setError(null);
    };

    const handleSave = async (id: string, type: string) => {
        try {
            if (type === "categories") {
                if (!editedData.titleRu || !editedData.titleKk || !editedData.titleEn) {
                    setError(t("error.requiredFields"));
                    return;
                }
                await fetchFromAPI(`/${type}/${id}`, {method: "PUT", body: JSON.stringify(editedData)});
                setCategories(categories.map(item => (item.id === id ? editedData : item)));
            } else {
                await fetchFromAPI(`/${type}/${id}`, {method: "PUT", body: JSON.stringify(editedData)});
                if (!editedData.floor || !editedData.room || !editedData.row || !editedData.shelf) {
                    setError(t("error.requiredFields"));
                    return;
                }
                setLocations(locations.map(item => (item.id === id ? editedData : item)));
            }
            setEditingId(null);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(t("error.updateFailed") + ": " + error.message);
            } else {
                setError(t("error.updateFailed"));
            }
        }
    };

    const handleDelete = async (id: string, type: string) => {
        try {
            const response = await fetchFromAPI(`/${type}/${id}`, {method: "DELETE"});
            console.log("Delete response:", response);

            if (type === "categories") {
                setCategories(categories.filter(item => item.id !== id));
            } else {
                setLocations(locations.filter(item => item.id !== id));
            }
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(t("error.deleteFailed") + ": " + error.message);
            } else {
                setError(t("error.deleteFailed"));
            }
        }
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await fetchFromAPI(`/users/role/${id}`, {
                method: "PUT",
                body: JSON.stringify({role: newRole})
            });
            setUsers(users.map(user => (user.id === id ? {...user, role: newRole} : user)));
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(t("error.updateRoleFailed") + ": " + error.message);
            } else {
                setError(t("error.updateRoleFailed"));
            }
        }
    };

    return (
        <Layout>
            <Container>
                {error && <Alert severity="error">{error}</Alert>}
                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                    <Tab label={t("categories.title")}/>
                    <Tab label={t("locations.title")}/>
                    <Tab label={t("users.title")}/>
                </Tabs>
                {tabIndex === 0 && (
                    <>
                        <Typography variant="h4" gutterBottom>{t("categories.title")}</Typography>
                        {loading && <CircularProgress/>}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
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
                                                    <TableCell><TextField value={editedData.titleRu}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              titleRu: e.target.value
                                                                          })} required error={!editedData.titleRu}
                                                                          helperText={!editedData.titleRu ? t("error.required") : ""}/></TableCell>
                                                    <TableCell><TextField value={editedData.titleKk}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              titleKk: e.target.value
                                                                          })} required error={!editedData.titleKk}
                                                                          helperText={!editedData.titleKk ? t("error.required") : ""}/></TableCell>
                                                    <TableCell><TextField value={editedData.titleEn}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              titleEn: e.target.value
                                                                          })} required error={!editedData.titleEn}
                                                                          helperText={!editedData.titleEn ? t("error.required") : ""}/></TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => handleSave(category.id, "categories")}><Save/></IconButton>
                                                        <IconButton onClick={handleCancel}><Cancel/></IconButton>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{category.titleRu}</TableCell>
                                                    <TableCell>{category.titleKk}</TableCell>
                                                    <TableCell>{category.titleEn}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => handleEdit(category.id, category)}><Edit/></IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(category.id, "categories")}><Delete/></IconButton>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                    ))}
                                    {newCategory && (
                                        <TableRow>
                                            <TableCell><TextField value={newCategory.titleRu}
                                                                  onChange={(e) => setNewCategory({
                                                                      ...newCategory,
                                                                      titleRu: e.target.value
                                                                  })} required error={!newCategory.titleRu}
                                                                  helperText={!newCategory.titleRu ? t("error.required") : ""}/></TableCell>
                                            <TableCell><TextField value={newCategory.titleKk}
                                                                  onChange={(e) => setNewCategory({
                                                                      ...newCategory,
                                                                      titleKk: e.target.value
                                                                  })} required error={!newCategory.titleKk}
                                                                  helperText={!newCategory.titleKk ? t("error.required") : ""}/></TableCell>
                                            <TableCell><TextField value={newCategory.titleEn}
                                                                  onChange={(e) => setNewCategory({
                                                                      ...newCategory,
                                                                      titleEn: e.target.value
                                                                  })} required error={!newCategory.titleEn}
                                                                  helperText={!newCategory.titleEn ? t("error.required") : ""}/></TableCell>
                                            <TableCell>
                                                <IconButton onClick={handleSaveCategory}><Save/></IconButton>
                                                <IconButton onClick={handleCancel}><Cancel/></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={() => setNewCategory({ titleRu: "", titleKk: "", titleEn: ""})}>
                            <AddCircle/> {t("categories.add")}
                        </Button>
                    </>
                )}

                {tabIndex === 1 && (
                    <>
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
                                            {editingId === location.id ? (
                                                <>
                                                    <TableCell><TextField value={editedData.floor}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              floor: e.target.value
                                                                          })} required error={!editedData.floor}
                                                                          helperText={!editedData.floor ? t("error.required") : ""}/></TableCell>
                                                    <TableCell><TextField value={editedData.room}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              room: e.target.value
                                                                          })} required error={!editedData.room}
                                                                          helperText={!editedData.room ? t("error.required") : ""}/></TableCell>
                                                    <TableCell><TextField value={editedData.row}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              row: e.target.value
                                                                          })} required error={!editedData.row}
                                                                          helperText={!editedData.row ? t("error.required") : ""}/></TableCell>
                                                    <TableCell><TextField value={editedData.shelf}
                                                                          onChange={(e) => setEditedData({
                                                                              ...editedData,
                                                                              shelf: e.target.value
                                                                          })} required error={!editedData.shelf}
                                                                          helperText={!editedData.shelf ? t("error.required") : ""}/></TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => handleSave(location.id, "locations")}><Save/></IconButton>
                                                        <IconButton onClick={handleCancel}><Cancel/></IconButton>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{location.floor}</TableCell>
                                                    <TableCell>{location.room}</TableCell>
                                                    <TableCell>{location.row}</TableCell>
                                                    <TableCell>{location.shelf}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => handleEdit(location.id, location)}><Edit/></IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(location.id, "locations")}><Delete/></IconButton>
                                                    </TableCell>
                                                </>
                                            )}
                                        </TableRow>
                                    ))}
                                    {newLocation && (
                                        <TableRow>
                                            <TableCell><TextField value={newLocation.floor}
                                                                  onChange={(e) => setNewLocation({
                                                                      ...newLocation,
                                                                      floor: e.target.value
                                                                  })} required error={!newLocation.floor}
                                                                  helperText={!newLocation.floor ? t("error.required") : ""}/></TableCell>
                                            <TableCell><TextField value={newLocation.room}
                                                                  onChange={(e) => setNewLocation({
                                                                      ...newLocation,
                                                                      room: e.target.value
                                                                  })} required error={!newLocation.room}
                                                                  helperText={!newLocation.room ? t("error.required") : ""}/></TableCell>
                                            <TableCell><TextField value={newLocation.row}
                                                                  onChange={(e) => setNewLocation({
                                                                      ...newLocation,
                                                                      row: e.target.value
                                                                  })} required error={!newLocation.row}
                                                                  helperText={!newLocation.row ? t("error.required") : ""}/></TableCell>
                                            <TableCell><TextField value={newLocation.shelf}
                                                                  onChange={(e) => setNewLocation({
                                                                      ...newLocation,
                                                                      shelf: e.target.value
                                                                  })} required error={!newLocation.shelf}
                                                                  helperText={!newLocation.shelf ? t("error.required") : ""}/></TableCell>
                                            <TableCell>
                                                <IconButton onClick={handleSaveLocation}><Save/></IconButton>
                                                <IconButton onClick={handleCancel}><Cancel/></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={() => setNewLocation({floor: "", room: "", row: "", shelf: ""})}>
                            <AddCircle/> {t("locations.add")}
                        </Button>
                    </>
                )}

                {tabIndex === 2 && (
                    <>
                        <Typography variant="h4" gutterBottom>{t("users.title")}</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("users.username")}</TableCell>
                                        <TableCell>{t("users.email")}</TableCell>
                                        <TableCell>{t("users.role")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.firstName} {user.lastName} ({user.login})</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    <MenuItem value="reader">{t("roles.reader")}</MenuItem>
                                                    <MenuItem value="librarian">{t("roles.librarian")}</MenuItem>
                                                    <MenuItem value="admin">{t("roles.admin")}</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default AdminPage;
