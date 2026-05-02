import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Box, Divider } from "@mui/material";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import FilterBar from "../components/FilterBar";
import { useNotifications } from "../hooks/useNotifications";
import { getTopN } from "../utils/priorityScore";
import { Log } from "logging_middleware";

export default function PriorityInbox() {
    const [type, setType] = useState("");
    const [n, setN] = useState(10);

    const { data, loading, error } = useNotifications({
        notification_type: type || undefined,
    });

    useEffect(() => {
        Log("frontend", "info", "page", "priority inbox opened");
    }, []);

    const topNotifs = getTopN(data, n);

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Priority Inbox
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ranked by type weight + recency. Placement beats Result beats Event.
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <FilterBar
                    type={type}
                    onTypeChange={(t) => {
                        setType(t);
                        Log("frontend", "info", "component", `priority filter: ${t || "all"}`);
                    }}
                    topN={n}
                    onTopNChange={(val) => {
                        setN(val);
                        Log("frontend", "debug", "component", `top n changed to ${val}`);
                    }}
                />

                {loading && <CircularProgress size={28} />}
                {error && <Alert severity="error">{error}</Alert>}

                {!loading && topNotifs.length === 0 && (
                    <Typography color="text.secondary">No notifications.</Typography>
                )}

                {topNotifs.map((n) => (
                    <NotificationCard key={n.ID} notif={n} />
                ))}
            </Container>
        </>
    );
}