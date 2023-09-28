import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography component={"h1"} variant="h5" fontWeight="bold" flex={1}>
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              وبلاگ بوتواستارت
            </Link>
          </Typography>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            <IconButton aria-label="go to home">
              <BookIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
