import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#1a237e" }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Campus Alerts
        </Typography>
        <Link href="/" passHref>
          <Button
            color="inherit"
            sx={{
              textDecoration: isActive("/") ? "underline" : "none",
              opacity: isActive("/") ? 1 : 0.75,
            }}
          >
            All
          </Button>
        </Link>
        <Link href="/priority" passHref>
          <Button
            color="inherit"
            sx={{
              textDecoration: isActive("/priority") ? "underline" : "none",
              opacity: isActive("/priority") ? 1 : 0.75,
            }}
          >
            Priority
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}