'use client'

import React, { useState, useCallback } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase, Menu, MenuItem, Box, useMediaQuery, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, Avatar, Switch, Select, FormControl, InputLabel, Slide } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiBell, FiSettings, FiLogOut, FiPackage, FiX } from "react-icons/fi";
import debounce from "lodash/debounce";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "24px",
  backgroundColor: "#f5f5f5",
  marginRight: "16px",
  marginLeft: "16px",
  width: "100%",
  maxWidth: "600px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0",
    marginRight: "0",
    backgroundColor: "transparent",
    width: "auto",
    flexGrow: 1
  }
}));

const MobileSearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  position: "relative"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  width: "100%",
  padding: "8px 16px 8px 48px",
  '& .MuiInputBase-input': {
    color: '#000000'
  }
}));

const MobileInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  width: "100%",
  padding: "8px 16px 8px 16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "24px",
  '& .MuiInputBase-input': {
    color: '#000000'
  }
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#666666"
}));

const SearchButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#D23F57",
  color: "#ffffff",
  marginLeft: "8px",
  '&:hover': {
    backgroundColor: "#b2364a"
  }
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [cartCount] = useState(5);
  const [notifications] = useState(3);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery((theme) => 
    theme ? theme.breakpoints.down("sm") : '@media (max-width:600px)'
  );

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      console.log("Searching for:", searchTerm);
    }, 300),
    []
  );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isMobile) {
      handleSearch(e.target.value);
    }
  };

  const handleMobileSearch = () => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
    setShowMobileSearch(false);
  };

  const handleCloseMobileSearch = () => {
    setShowMobileSearch(false);
    setSearchTerm("");
  };

  const drawerContent = (
    <List>
      <ListItem button>
        <ListItemIcon>
          <FiUser color="#000000"/>
        </ListItemIcon>
        <ListItemText primary="My Account" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiPackage color="#000000"/>
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiSettings color="#000000"/>
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FiLogOut color="#000000"/>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {isMobile && !showMobileSearch && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: "#000000", mr: 1 }}
            >
              <FiMenu />
            </IconButton>
          )}

          {(!isMobile || !showMobileSearch) && (
            <Avatar
              src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
              alt="Company Logo"
              sx={{
                width: isMobile ? 40 : 48,
                height: isMobile ? 40 : 48,
                cursor: "pointer",
                mr: isMobile ? 1 : 2
              }}
            />
          )}

          {isMobile ? (
            showMobileSearch ? (
              <MobileSearchContainer>
                <IconButton
                  onClick={handleCloseMobileSearch}
                  sx={{ color: "#000000", mr: 1 }}
                >
                  <FiX />
                </IconButton>
                <MobileInputBase
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  inputProps={{ "aria-label": "search" }}
                  autoFocus
                />
                <SearchButton onClick={handleMobileSearch}>
                  <FiSearch />
                </SearchButton>
              </MobileSearchContainer>
            ) : (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton 
                  aria-label="search" 
                  onClick={toggleMobileSearch}
                  sx={{ color: "#000000" }}
                >
                  <FiSearch />
                </IconButton>
              </>
            )
          ) : (
            <SearchWrapper>
              <SearchIconWrapper>
                <FiSearch />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                inputProps={{ "aria-label": "search" }}
              />
            </SearchWrapper>
          )}

          {(!isMobile || !showMobileSearch) && (
            <Slide in={!showMobileSearch} direction="left" mountOnEnter unmountOnExit>
              <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                {!isMobile && (
                  <>
                  </>
                )}

                <IconButton 
                  aria-label="notifications"
                  sx={{ color: "#000000" }}
                >
                  <Badge badgeContent={notifications} color="error">
                    <FiBell />
                  </Badge>
                </IconButton>

                <IconButton 
                  aria-label="cart"
                  sx={{ color: "#000000" }}
                >
                  <Badge badgeContent={cartCount} color="error">
                    <FiShoppingCart />
                  </Badge>
                </IconButton>

                <IconButton
                  aria-label="profile"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: "#000000" }}
                >
                  <FiUser />
                </IconButton>
              </Box>
            </Slide>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawerContent}
          </Drawer>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;