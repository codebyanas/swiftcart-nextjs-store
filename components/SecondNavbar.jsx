'use client'

import React, { useState } from "react";
import Link from 'next/link'
import {
    AppBar, Toolbar, Menu, MenuItem, Box,
    Container, Button, Typography, ListItemIcon
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    FiChevronRight
} from "react-icons/fi";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined'; // Fashion (Outline)
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'; // Electronics (Outline)
import PedalBikeOutlinedIcon from '@mui/icons-material/PedalBikeOutlined'; // Bikes (Outline)
import YardOutlinedIcon from '@mui/icons-material/YardOutlined'; // Home & Garden (Outline)
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined'; // Gifts (Outline)
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Health & Beauty (Outline)
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined'; // Baby Toys (Outline)
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined'; // Accessories (Outline)


// 🔹 Styled Components
const StyledAppBar = styled(AppBar)({
    backgroundColor: "#ffffff",
    boxShadow: "none",
    '@media (max-width: 600px)': {
        display: 'none'
    }
});

// 🔹 Desktop View
const DesktopNavbar = ({ handleCategoriesMenuOpen }) => (
    <>
        <Button
            onClick={handleCategoriesMenuOpen}
            sx={{
                color: "#000000",
                width: "20%",
                textTransform: "none",
                mr: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                px: 2,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                minWidth: 180
            }}
            startIcon={<SpaceDashboardIcon sx={{ color: '#D23F57' }} />}
            endIcon={<FiChevronRight />}
        >
            <Typography
                sx={{
                    color: '#2b3445',
                    fontWeight: 400,
                    fontFamily: '"Public Sans", sans-serif',
                    fontSize: '16px',
                    flexGrow: 1,
                    textAlign: 'left'
                }}
            >
                Categories
            </Typography>
        </Button>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
            {["Home", "Pages", "Men", "Women", "Kids"].map(label => (
                <Button
                    key={label}
                    sx={{
                        color: '#2b3445',
                        fontWeight: 500,
                        fontFamily: '"Public Sans", sans-serif',
                        fontSize: '14px',
                        textTransform: 'none',
                        '&:hover': { backgroundColor: 'transparent' }
                    }}
                >
                    {label}
                </Button>
            ))}
        </Box>
    </>
);

// 🔹 Main Navbar Component
const SecondNavbar = () => {
    const [categoriesAnchorEl, setCategoriesAnchorEl] = useState(null);

    const handleCategoriesMenuOpen = (e) => setCategoriesAnchorEl(e.currentTarget);
    const handleCategoriesMenuClose = () => setCategoriesAnchorEl(null);

    const categoryItems = [
        { label: "Fashion", slug: "fashion", icon: <CheckroomOutlinedIcon /> },
        { label: "Electronics", slug: "electronics", icon: <DevicesOtherOutlinedIcon /> },
        { label: "Bikes", slug: "bikes", icon: <PedalBikeOutlinedIcon /> },
        { label: "Home and Garden", slug: "home-garden", icon: <YardOutlinedIcon /> },
        { label: "Gifts", slug: "gifts", icon: <CardGiftcardOutlinedIcon /> },
        { label: "Health and Beauty", slug: "health-beauty", icon: <FavoriteBorderIcon /> },
        { label: "Baby Toys", slug: "baby-toys", icon: <ChildCareOutlinedIcon /> },
        { label: "Accessories", slug: "accessories", icon: <WatchOutlinedIcon /> }
    ];

    return (
        <StyledAppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar>
                    <DesktopNavbar handleCategoriesMenuOpen={handleCategoriesMenuOpen} />

                    <Menu
                        anchorEl={categoriesAnchorEl}
                        open={Boolean(categoriesAnchorEl)}
                        onClose={handleCategoriesMenuClose}
                        PaperProps={{
                            sx: {
                                borderRadius: '6px',
                                mt: 1
                            }
                        }}
                    >
                        <Menu
                            anchorEl={categoriesAnchorEl}
                            open={Boolean(categoriesAnchorEl)}
                            onClose={handleCategoriesMenuClose}
                            PaperProps={{
                                sx: {
                                    borderRadius: '6px',
                                    mt: 1,
                                    width: '18%'  // Set a specific width for the dropdown menu
                                }
                            }}
                        >
                            {categoryItems.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/category/${item.slug}`}
                                    passHref
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <MenuItem
                                        key={item.label}
                                        onClick={handleCategoriesMenuClose}
                                        sx={{
                                            color: '#2b3445',
                                            fontWeight: 400,
                                            fontFamily: '"Public Sans", sans-serif',
                                            fontSize: '16px'
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        {item.label}
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Menu>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default SecondNavbar;
