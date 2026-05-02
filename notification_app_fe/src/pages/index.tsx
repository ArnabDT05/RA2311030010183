import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "logging_middleware";

export default function AllNotifications() {
    const [type, setType] = useState("");

    const { data, loading, error } = useNotifications({
        notification_type: type || undefined,
    });

    useEffect(() => {
        Log("frontend", "info", "page", "landed on all notifications");
    }, []);

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        All Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click a notification to mark it as viewed
                    </Typography>
                </Box>

                <FilterBar
                    type={type}
                    onTypeChange={(t) => {
                        setType(t);
                        Log("frontend", "info", "component", `type filter: ${t || "all"}`);
                    }}
                />

                {loading && <CircularProgress size={28} />}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {!loading && data.length === 0 && (
                    <Typography color="text.secondary">Nothing here.</Typography>
                )}

                {data.map((n) => (
                    <NotificationCard key={n.ID} notif={n} />
                ))}
            </Container>
        </>
    );
}