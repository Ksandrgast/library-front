import React, { useEffect, useState } from "react";
import {
    Container, Typography, Card, CardContent, CircularProgress, Button, Alert, TablePagination, Box
} from "@mui/material";
import Layout from "../../components/Layout";
import { useTranslation } from "react-i18next";
import { fetchFromAPI } from "../../utils/api";
import { useAuth } from "../../providers/AuthProvider";

interface Booking {
    id: string;
    bookTitle: string;
    startDate: string;
    endDate: string;
    status: string;
}

const ITEMS_PER_PAGE = 10;

const Bookings: React.FC = () => {
    const { t } = useTranslation();
    const { isLibrarian } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchFromAPI(isLibrarian() ? "/bookings" : "/bookings/my");
                setBookings(data);
            } catch (err) {
                setError(t("bookings.loadError"));
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [t, isLibrarian]);

    const handleCancelBooking = async (id: string) => {
        if (!window.confirm(t("bookings.confirmCancel"))) return;

        try {
            await fetchFromAPI(`/bookings/${id}`, { method: "DELETE" });
            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
        } catch (error) {
            setError(t("errors.cancelBooking"));
            console.error(t("errors.cancelBooking"), error);
        }
    };

    const handleReturnBook = async (bookingId: string) => {
        try {
            await fetchFromAPI(`/bookings/return/${bookingId}`, { method: "PATCH" });
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "RETURNED" } : b));
        } catch (err) {
            setError(t("bookings.returnError"));
        }
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
                    {isLibrarian() ? t("bookings.bookings") : t("bookings.myBookings")}
                </Typography>

                {loading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
                {!loading && !error && bookings.length === 0 && (
                    <Typography>{t("bookings.noBookings")}</Typography>
                )}

                {!loading && !error && bookings.length > 0 && (
                    <>
                        {bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                            <Card key={booking.id} sx={{ mt: 2 }}>
                                <CardContent>
                                    <Typography variant="h5">{booking.bookTitle}</Typography>
                                    <Typography>{t("bookings.start")}: {new Date(booking.startDate).toLocaleDateString()}</Typography>
                                    <Typography>{t("bookings.end")}: {new Date(booking.endDate).toLocaleDateString()}</Typography>
                                    <Typography>{t("bookings.status")}: {t(`bookings.statuses.${booking.status}`)}</Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                    {booking.status !== "RETURNED" && (
                                        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleReturnBook(booking.id)}>
                                            {t("bookings.returnBook")}
                                        </Button>
                                    )}
                                    {booking.status !== "RETURNED" && isLibrarian() && (
                                        <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => handleCancelBooking(booking.id)}>
                                            {t("bookings.cancel")}
                                        </Button>
                                    )}

                                </Box>
                                </CardContent>
                            </Card>
                        ))}
                        <TablePagination
                            component="div"
                            count={bookings.length}
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
                )}
            </Container>
        </Layout>
    );
};

export default Bookings;
