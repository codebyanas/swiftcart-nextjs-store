'use client'

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Switch, IconButton, TextField, Button, useTheme, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaSun, FaMoon } from "react-icons/fa";

const StyledFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? "linear-gradient(45deg, #1a237e 30%, #311b92 90%)"
    : "linear-gradient(45deg, #e3f2fd 30%, #e3f2fd 90%)",
  padding: theme.spacing(6, 0),
  transition: "all 0.3s ease-in-out",
  color: theme.palette.mode === "dark" ? "#fff" : "#333"
}));

const StyledLink = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateX(5px)",
    color: theme.palette.primary.main
  }
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1) translateY(-2px)",
    color: theme.palette.primary.main
  }
}));

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2"
      }
    }
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const quickLinks = [
    "About Us",
    "Services",
    "Products",
    "Contact Us",
    "Careers",
    "FAQ"
  ];

  return (
    <ThemeProvider theme={theme}>
      <StyledFooter component="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Company Info
              </Typography>
              <Typography variant="body2" paragraph>
                Innovation Tech Solutions
                <br />
                123 Business Avenue
                <br />
                Tech City, TC 12345
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Switch
                  checked={darkMode}
                  onChange={handleThemeChange}
                  icon={<FaSun size={20} />}
                  checkedIcon={<FaMoon size={20} />}
                  color="primary"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              {quickLinks.map((link, index) => (
                <StyledLink
                  key={index}
                  variant="body2"
                  paragraph
                  sx={{ mb: 1 }}
                >
                  {link}
                </StyledLink>
              ))}
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Contact Us
              </Typography>
              <Typography variant="body2" paragraph>
                Phone: +1 234 567 890
                <br />
                Email: info@example.com
                <br />
                Hours: Mon-Fri 9:00-18:00
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Newsletter
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 3 }}
              >
                Subscribe
              </Button>
              <Box>
                <SocialIcon aria-label="facebook">
                  <FaFacebook />
                </SocialIcon>
                <SocialIcon aria-label="twitter">
                  <FaTwitter />
                </SocialIcon>
                <SocialIcon aria-label="instagram">
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon aria-label="linkedin">
                  <FaLinkedin />
                </SocialIcon>
                <SocialIcon aria-label="github">
                  <FaGithub />
                </SocialIcon>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              mt: 4,
              pt: 2,
              textAlign: "center"
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Innovation Tech Solutions. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;