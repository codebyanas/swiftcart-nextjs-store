'use client'

import React from "react";
import { Box, Container, Grid, Typography, IconButton, TextField, Button, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from 'next/image'

const StyledFooter = styled(Box)({
  background: "linear-gradient(45deg, #222935 30%, #222935 90%)",
  padding: "48px 0",
  transition: "all 0.3s ease-in-out",
  color: "#e0e0e0",
  width: "100%", // Ensure it spans full width
  position: "absolute", // Stick it to the bottom
  bottom: "0",
  left: "0",
});


const StyledLink = styled(Typography)({
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateX(5px)",
    color: "#e0e0e0" // Using a fixed color instead of theme
  }
});

const SocialIcon = styled(IconButton)({
  margin: "0 8px",
  transition: "all 0.3s ease",
  color: "#e0e0e0",
  "&:hover": {
    transform: "scale(1.1) translateY(-2px)",
    color: "#e0e0e0" // Using a fixed color instead of theme
  }
});

const Footer = () => {
  const quickLinks = [
    "About Us",
    "Services",
    "Products",
    "Contact Us",
    "Careers",
    "FAQ"
  ];

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Image
              src="/store/swiftcart-name.png"
              width={140}
              height={40}
              alt="Company logo"
              style={{ marginLeft: '-6px' }}
            />
            <Typography variant="body2" paragraph>
              Innovation Tech Solutions
              <br />
              123 Business Avenue
              <br />
              Tech City, TC 12345
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h6" gutterBottom fontWeight="regular" color="common.white">
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

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h6" gutterBottom fontWeight="regular" color="common.white">
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

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Typography variant="h6" gutterBottom fontWeight="regular" color="common.white">
              Newsletter
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Enter your email"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white', // White border
                  },
                  '&:hover fieldset': {
                    borderColor: 'white', // White border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // White border when focused
                  },
                  color: 'white', // White text color
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // White label color
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white placeholder
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mb: 3,
                backgroundColor: "#1976d2",
                color: "white", // Explicit white text
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "white", // White text on hover
                }
              }}
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
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            mt: 4,
            pt: 2,
            textAlign: "center"
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            © {new Date().getFullYear()} Innovation Tech Solutions. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;