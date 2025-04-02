'use client'

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";

export default function Banner() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 12,
                py: 4,
                height: { xs: "auto", md: "400px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                    bgcolor: "background.paper",
                    width: "100%",
                    maxWidth: "1400px",
                }}
            >
                {/* Text Section - Now with left-aligned content */}
                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "300px",
                        maxWidth: "600px",
                        alignItems: { xs: "center", md: "flex-start" }, // Left-align on desktop, center on mobile
                        textAlign: { xs: "center", md: "left" } // Text alignment matches
                    }}
                >
                    <Typography variant="h2" sx={{ color: "#424242" }}>
                        50% off for your first Shopping
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3, color: "text.secondary" }}>
                        Explore the latest trends with exclusive deals. Shop now and save big! Explore the latest trends with exclusive deals. Shop now and save big!
                    </Typography>
                    <Button 
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2,
                            width: { xs: "100%", md: "auto", background: "#D23F57" }, // Full width on mobile, auto on desktop
                            alignSelf: { xs: "stretch", md: "flex-start" } // Left-align on desktop
                        }}
                    >
                        Shop Now
                    </Button>
                </Box>

                {/* Image Section */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        width: { xs: "100%", md: "50%" },
                        mt: { xs: 3, md: 0 },
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src="/images/hero.png"
                        width={500}
                        height={600}
                        alt="Product Banner"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}