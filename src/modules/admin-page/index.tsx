import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination } from "@mui/material";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AdminPage: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    // 📌 Книги по умолчанию
    const [books, setBooks] = useState([
        { id: 1, title: "Test Book 1", author: "Author 1", description: "Description of Test Book 1", category: "fiction" },
        { id: 2, title: "Test Book 2", author: "Author 2", description: "Description of Test Book 2", category: "science" },
        { id: 3, title: "Test Book 3", author: "Author 3", description: "Description of Test Book 3", category: "history" },
        { id: 4, title: "Test Book 4", author: "Author 4", description: "Description of Test Book 4", category: "technology" },
        { id: 5, title: "Test Book 5", author: "Author 5", description: "Description of Test Book 5", category: "fiction" },
        { id: 6, title: "Test Book 6", author: "Author 6", description: "Description of Test Book 6", category: "science" },
        { id: 7, title: "Test Book 7", author: "Author 7", description: "Description of Test Book 7", category: "history" },
        { id: 8, title: "Test Book 8", author: "Author 8", description: "Description of Test Book 8", category: "technology" }
    ]);

    const [filteredBooks, setFilteredBooks] = useState(books);

    // 📌 Обновляем `searchQuery` при изменении URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("search") || "";
        const category = params.get("category") || "";

        setFilteredBooks(
            books.filter(book =>
                (query ? book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()) : true) &&
                (category ? book.category === category : true) // Фильтр по категории
            )
        );
    }, [location.search, books]);

    const [newBook, setNewBook] = useState<{ id: number; title: string; author: string; description: string; category: string  }>({
        id: 0,
        title: "",
        author: "",
        description: "",
        category: ""
    });

    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveBook = () => {
        if (newBook.title && newBook.author && newBook.description) {
            if (newBook.id !== 0) {
                setBooks(books.map(book => (book.id === newBook.id ? newBook : book)));
            } else {
                setBooks([...books, { ...newBook, id: books.length + 1 }]);
            }
            setNewBook({ id: 0, title: "", author: "", description: "", category: "" });
            setOpenModal(false);
        }
    };

    const handleEditBook = (book: { id: number; title: string; author: string; description: string; category: string }) => {
        setNewBook(book);
        setOpenModal(true);
    };

    const handleOpenModal = () => {
        setNewBook({ id: 0, title: "", author: "", description: "", category: "" });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    {t("admin.title")}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 2 }}>
                    {t("admin.addBook")}
                </Button>
                {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
                    <Card key={book.id} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h5">{book.title}</Typography>
                            <Typography variant="subtitle1">{book.author}</Typography>
                            <Typography>{book.description}</Typography>
                            <Button onClick={() => handleEditBook(book)}>{t("admin.edit")}</Button>
                        </CardContent>
                    </Card>
                ))}
                <TablePagination
                    component="div"
                    count={filteredBooks.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={t("table.rowsPerPage")}
                    labelDisplayedRows={({ from, to, count }) =>
                        t("table.displayedRows", { from, to, count: count !== -1 ? count : Number(t("table.moreThan", { count: to })) })
                    }
                />
                <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                    <DialogTitle>{newBook.id !== 0 ? t("admin.editBook") : t("admin.addBook")}</DialogTitle>
                    <DialogContent>
                        <TextField label={t("admin.titleField")} name="title" value={newBook.title} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label={t("admin.authorField")} name="author" value={newBook.author} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
                        <TextField label={t("admin.descriptionField")} name="description" value={newBook.description} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>{t("admin.cancel")}</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveBook}>{newBook.id !== 0 ? t("admin.saveChanges") : t("admin.addBook")}</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Layout>
    );
};

export default AdminPage;
