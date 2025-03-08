import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    TablePagination,
    CircularProgress,
    Alert, Snackbar
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import { fetchFromAPI } from "../../utils/api";
import { useAuth } from "../../providers/AuthProvider";

const ITEMS_PER_PAGE = 10;
const MAX_BORROW_DAYS = 30;

const MainPage: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [bookingPeriod, setBookingPeriod] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(0);

    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [totalBooks, setTotalBooks] = useState(0);

    const { isLibrarian } = useAuth();

    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const category = params.get("category") || "";

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    search,
                    category,
                    page: page.toString(),
                    limit: rowsPerPage.toString(),
                });
                const data = await fetchFromAPI(`/books?${params.toString()}`);

                setBooks(data.books);  // Обновляем массив книг
                setTotalBooks(data.total); // Обновляем общее количество книг
            } catch (err) {
                setError("Не удалось загрузить книги. Попробуйте позже.");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [search, category, page, rowsPerPage]);

    const handleBookingPeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 2) value = value.slice(0, 2);
        if (parseInt(value) > MAX_BORROW_DAYS) value = MAX_BORROW_DAYS.toString();
        setBookingPeriod(value);
    };

    const handleBookSelection = (book: any) => {
        setSelectedBook(book);
        setOpenModal(true);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setBookingError(null);
        setBookingPeriod("");
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBooking = async () => {
        if (!selectedBook) return;
        if(!bookingPeriod) {
            setBookingError(t("mainPage.bookingError") + t("mainPage.selectPeriod"));
            return;
        }
        try {
            await fetchFromAPI("/bookings", {
                method: "POST",
                body: JSON.stringify({
                    bookId: selectedBook.id,
                    startDate: new Date(),
                    endDate: new Date(Date.now() + parseInt(bookingPeriod) * 24 * 60 * 60 * 1000),
                })
            });
            setSnackbarOpen(true);
            handleCloseModal();
        } catch (err) {
            if (err instanceof Error) {
                setBookingError(t("mainPage.bookingError") + err.message);
            } else {
                setError(t("mainPage.bookingError"));
            }
        }
    };

    return (
        <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    {t("mainPage.welcome")}
                </Typography>

                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}

                {!loading && !error && books.length > 0 ? (
                    <>
                        {books.map((book) => (
                            <Card key={book.id} sx={{ mt: 2, cursor: "pointer" }} onClick={() => handleBookSelection(book)}>
                                <CardContent>
                                    <Typography variant="h5">{book.title}</Typography>
                                    <Typography variant="subtitle1">
                                        {t("mainPage.author")}: {book.authors.join(", ")}
                                    </Typography>
                                    <Typography>{t("mainPage.yearField")}: {book.year}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <TablePagination
                            component="div"
                            count={totalBooks} // Указываем общее количество книг из бэка
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage={t("table.rowsPerPage")}
                            labelDisplayedRows={({ from, to, count }) =>
                                t("table.displayedRows", { from, to, count: count !== -1 ? count : Number(t("table.moreThan", { count: to })) })
                            }
                        />
                    </>
                ) : (
                    !loading && !error && (
                        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                            {t("mainPage.noResults")}
                        </Typography>
                    )
                )}

                <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
                    <DialogTitle>{selectedBook?.title}</DialogTitle>
                    <DialogContent>
                        <Typography>{t("mainPage.author")}: {selectedBook?.authors.join(", ")}</Typography>
                        <Typography>{t("mainPage.yearField")}: {selectedBook?.year}</Typography>
                        <Typography>{selectedBook?.description}</Typography>
                        { !isLibrarian() && <TextField
                            label={t("mainPage.borrowPeriod")}
                            variant="outlined"
                            fullWidth
                            value={bookingPeriod}
                            onChange={handleBookingPeriodChange}
                            sx={{ mt: 2 }}
                            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
                        /> }
                        {bookingError && <Alert severity="error" sx={{ mt: 2 }}>{bookingError}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>{t("mainPage.close")}</Button>
                        { !isLibrarian() && <Button variant="contained" color="primary" onClick={handleBooking}>{t("mainPage.bookNow")}</Button> }
                    </DialogActions>
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ top: "100px" }} onClose={() => setSnackbarOpen(false)} >
                    <Alert severity="success" >{t("mainPage.bookingSuccess")}</Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default MainPage;
