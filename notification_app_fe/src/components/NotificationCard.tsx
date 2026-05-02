import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Notification } from "../api/notifications";
import { getViewedIds, markViewed } from "../state/viewedStore";
import { useEffect, useState } from "react";
import { Log } from "logging_middleware";
const chipColor = (type: string) => {
    if (type === "Placement") return "error";
    if (type === "Result") return "warning";
    return "info";
};

export default function NotificationCard({ notif }: { notif: Notification }) {
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        setSeen(getViewedIds().has(notif.ID));
    }, [notif.ID]);

    function handleClick() {
        if (!seen) {
            markViewed(notif.ID);
            setSeen(true);
            Log("frontend", "info", "component", `notification viewed: ${notif.ID}`);
        }
    }

    return (
        <Card
            onClick={handleClick}
            elevation={seen ? 0 : 2}
            sx={{
                mb: 1.5,
                cursor: "pointer",
                borderLeft: `5px solid ${seen ? "#bdbdbd" : "#1a237e"}`,
                backgroundColor: seen ? "#fafafa" : "#fff",
                transition: "all 0.2s",
                "&:hover": { boxShadow: 4 },
            }}
        >
            <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography
                        variant="body1"
                        color={seen ? "text.secondary" : "text.primary"}
                        sx={{ fontWeight: seen ? 400 : 600 }}
                    >
                        {notif.Message}
                    </Typography>
                    <Chip
                        label={notif.Type}
                        color={chipColor(notif.Type) as any}
                        size="small"
                        sx={{ ml: 1 }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <Typography variant="caption" color="text.disabled">
                        {new Date(notif.Timestamp).toLocaleString()}
                    </Typography>
                    {!seen && (
                        <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                            • new
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}