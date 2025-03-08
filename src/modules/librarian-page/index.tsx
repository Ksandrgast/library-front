import React, { useState, useEffect } from "react";
import {
    Container, Typography, TextField, Button, Card, CardContent, Dialog, DialogTitle,
    DialogContent, DialogActions, TablePagination, FormControl, InputLabel, Select, MenuItem, Box
} from "@mui/material";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";
import { fetchFromAPI } from "../../utils/api";
import {useLocation} from "react-router-dom";

interface Category {
    id: string;
    titleRu: string;
    titleKk: string;
    titleEn: string;
}

interface Location {
    id: string;
    floor: string;
    room: string;
    row: string;
    shelf: string;
}

interface Book {
    id: string;
    title: string;
    authors: string[];
    description: string;
    year: number;
    quantity: number;
    categoryId: string;
    locationId: string;
}

const emptyBook = {
    id: "",
    title: "",
    authors: [],
    description: "",
    year: new Date().getFullYear(),
    quantity: 1,
    categoryId: "",
    locationId: ""
};

const LibrarianPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [newBook, setNewBook] = useState<Book>(emptyBook);
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);

    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const category = params.get("category") || "";

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const params = new URLSearchParams({
                    search,
                    category,
                    page: page.toString(),
                    limit: rowsPerPage.toString(),
                });
                const response = await fetchFromAPI(`/books?${params.toString()}`);
                setBooks(response.books);
                setTotal(response.total);
            } catch (error) {
                console.error("Ошибка загрузки книг:", error);
            }
        };
        const loadCategories = async () => {
            try {
                const categoriesData = await fetchFromAPI("/categories");
                setCategories(categoriesData);
            } catch (error) {
                console.error("Ошибка загрузки категорий:", error);
            }
        };

        const loadLocations = async () => {
            try {
                const locationsData = await fetchFromAPI("/locations");
                setLocations(locationsData);
            } catch (error) {
                console.error("Ошибка загрузки адресов:", error);
            }
        };

        fetchBooks();
        loadCategories();
        loadLocations();
    }, [search, category, page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setNewBook(prev => ({ ...prev, [name as string]: value }));
    };

    const handleAuthorsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const authorsArray = event.target.value.split(",").map(author => author.trim());
        setNewBook(prev => ({ ...prev, authors: authorsArray }));
    };

    const handleCategoryChange = (event: any) => {
        setNewBook(prev => ({ ...prev, categoryId: event.target.value }));
    };

    const handleLocationChange = (event: any) => {
        setNewBook(prev => ({ ...prev, locationId: event.target.value }));
    };

    const handleEditBook = (book: Book) => {
        setNewBook({ ...book });
        setOpenModal(true);
    };

    const handleOpenModal = () => {
        setNewBook(emptyBook);
        setOpenModal(true);
    };

    const handleSaveBook = async () => {
        try {
            if (!newBook.categoryId || !newBook.locationId) {
                console.error("Ошибка: Категория и локация должны быть выбраны");
                return;
            }

            // Создаём объект без id, если книга новая
            const { id, ...bookData } = newBook.id ? newBook : { ...newBook, id: undefined };

            if (newBook.id) {
                await fetchFromAPI(`/books/${newBook.id}`, {
                    method: "PUT",
                    body: JSON.stringify(bookData)
                });
                setBooks(books.map(book => (book.id === newBook.id ? { ...book, ...bookData } : book)));
            } else {
                const createdBook = await fetchFromAPI("/books", {
                    method: "POST",
                    body: JSON.stringify(bookData)
                });
                setBooks([...books, createdBook]);
            }
            setOpenModal(false);
        } catch (error) {
            console.error("Ошибка сохранения книги:", error);
        }
    };

    const handleDeleteBook = async (id: string) => {
        if (!window.confirm(t("librarian.confirmDelete"))) return;

        try {
            await fetchFromAPI(`/books/${id}`, { method: "DELETE" });
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
        } catch (error) {
            console.error(t("errors.deleteBook"), error);
        }
    };

    const getCategoryTitle = (categoryId: string) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? (i18n.language === "kk" ? category.titleKk : i18n.language === "en" ? category.titleEn : category.titleRu) : "";
    };

    const getLocationTitle = (locationId: string) => {
        const location = locations.find(loc => loc.id === locationId);
        return location ? `${location.floor}, ${location.room}, ${location.row}, ${location.shelf}` : "";
    };

    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    {t("librarian.title")}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 2 }}>
                    {t("librarian.addBook")}
                </Button>
                {books.map((book) => (
                    <Card key={book.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{book.title}</Typography>
                            <Typography variant="subtitle1">{t("librarian.authorsField")}: {book.authors.join(", ")}</Typography>
                            <Typography>{t("librarian.descriptionField")}: {book.description}</Typography>
                            <Typography>{t("librarian.yearField")}: {book.year}</Typography>
                            <Typography>{t("librarian.quantity")}: {book.quantity}</Typography>
                            <Typography>{t("librarian.category")}: {getCategoryTitle(book.categoryId)}</Typography>
                            <Typography>{t("librarian.location")}: {getLocationTitle(book.locationId)}</Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button onClick={() => handleEditBook(book)}>{t("librarian.edit")}</Button>
                                <Button variant="contained" color="error" onClick={() => handleDeleteBook(book.id)}>
                                    {t("librarian.deleteBook")}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
                <TablePagination
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={t("table.rowsPerPage")}
                    labelDisplayedRows={({ from, to, count }) =>
                        t("table.displayedRows", { from, to, count: Number(count) })
                    }
                />
                <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
                    <DialogTitle>{t("librarian.addBook")}</DialogTitle>
                    <DialogContent>
                        <TextField label={t("librarian.titleField")} name="title" value={newBook.title} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label={t("librarian.authorsField")} value={newBook.authors.join(", ")} onChange={handleAuthorsChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label={t("librarian.descriptionField")} name="description" value={newBook.description} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label={t("librarian.yearField")}
                                   name="year" type="number"
                                   inputProps={{ maxLength: 4, inputMode: "numeric", pattern: "\\d*" }}
                                   value={newBook.year}
                                   onChange={handleInputChange}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > 4) {
                                           e.target.value = e.target.value.slice(0, 4);
                                       }
                                   }}
                                   fullWidth
                                   sx={{
                                       mb: 2,
                                       "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                           WebkitAppearance: "none",
                                           margin: 0,
                                       },
                                       "& input[type=number]": {
                                           MozAppearance: "textfield",
                                       },
                                   }}/>
                        <TextField label={t("librarian.quantity")} name="quantity"
                                   type="number"
                                   inputProps={{ maxLength: 5, inputMode: "numeric", pattern: "\\d*" }}
                                   value={newBook.quantity}
                                   onChange={handleInputChange}
                                   onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       if (e.target.value.length > 5) {
                                           e.target.value = e.target.value.slice(0, 5);
                                       }
                                   }}
                                   fullWidth
                                   sx={{
                                       mb: 2,
                                       "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                                           WebkitAppearance: "none",
                                           margin: 0,
                                       },
                                       "& input[type=number]": {
                                           MozAppearance: "textfield",
                                       },
                                   }}/>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>{t("librarian.category")}</InputLabel>
                            <Select
                                value={newBook.categoryId || ""}
                                onChange={handleCategoryChange}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {getCategoryTitle(cat.id)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>{t("librarian.location")}</InputLabel>
                            <Select
                                value={newBook.locationId || ""}
                                onChange={handleLocationChange}
                            >
                                {locations.map(loc => (
                                    <MenuItem key={loc.id} value={loc.id}>
                                        {getLocationTitle(loc.id)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModal(false)}>{t("librarian.cancel")}</Button>
                        <Button variant="contained" onClick={handleSaveBook}>{t("librarian.saveChanges")}</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default LibrarianPage;
