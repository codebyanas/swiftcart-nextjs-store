'use client'

import React, { useState, useCallback } from "react";
import {
  AppBar, Toolbar, IconButton, Badge, InputBase, Menu, MenuItem, Box,
  useMediaQuery, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Container, Avatar, Slide
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FiSearch, FiShoppingCart, FiUser, FiMenu, FiBell,
  FiSettings, FiLogOut, FiPackage, FiX
} from "react-icons/fi";
import debounce from "lodash/debounce";
import { FiChevronDown, FiGrid } from "react-icons/fi"; 

// 🔹 Styled Components
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  boxShadow: "none"
});

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "24px",
  backgroundColor: "#f5f5f5",
  marginRight: "16px",
  marginLeft: "16px",
  width: "100%",
  maxWidth: "600px",
}));

const MobileSearchContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  position: "relative"
});

const StyledInputBase = styled(InputBase)({
  color: "#000000",
  width: "100%",
  padding: "8px 16px 8px 48px",
  '& .MuiInputBase-input': {
    color: '#000000'
  }
});

const MobileInputBase = styled(InputBase)({
  color: "#000000",
  width: "100%",
  padding: "8px 16px 8px 16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "24px",
  '& .MuiInputBase-input': {
    color: '#000000'
  }
});

const SearchIconWrapper = styled(Box)({
  position: "absolute",
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#666666"
});

const SearchButton = styled(IconButton)({
  backgroundColor: "#D23F57",
  color: "#ffffff",
  marginLeft: "8px",
  '&:hover': {
    backgroundColor: "#b2364a"
  }
});

// 🔹 Drawer Content
const drawerContent = (
  <List>
    {[
      { icon: <FiUser />, label: "My Account" },
      { icon: <FiPackage />, label: "Orders" },
      { icon: <FiSettings />, label: "Settings" },
      { icon: <FiLogOut />, label: "Logout" },
    ].map(({ icon, label }) => (
      <ListItem button key={label}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    ))}
  </List>
);

// 🔹 Mobile View
const MobileNavbar = ({
  handleDrawerToggle, toggleMobileSearch, handleCloseMobileSearch,
  handleSearchChange, handleMobileSearch, searchTerm, showMobileSearch,
  cartCount, notifications, handleProfileMenuOpen
}) => (
  <>
    {!showMobileSearch && (
      <IconButton onClick={handleDrawerToggle} sx={{ color: "#000000", mr: 1 }}>
        <FiMenu />
      </IconButton>
    )}

    {!showMobileSearch && (
      <Avatar
        src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
        alt="Logo"
        sx={{ width: 40, height: 40, cursor: "pointer", mr: 1 }}
      />
    )}

    {showMobileSearch ? (
      <MobileSearchContainer>
        <IconButton onClick={handleCloseMobileSearch} sx={{ color: "#000000", mr: 1 }}>
          <FiX />
        </IconButton>
        <MobileInputBase
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          autoFocus
        />
        <SearchButton onClick={handleMobileSearch}>
          <FiSearch />
        </SearchButton>
      </MobileSearchContainer>
    ) : (
      <>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={toggleMobileSearch} sx={{ color: "#000000" }}>
          <FiSearch />
        </IconButton>
        <IconButton sx={{ color: "#000000" }}>
          <Badge badgeContent={notifications} color="error">
            <FiBell />
          </Badge>
        </IconButton>
        <IconButton sx={{ color: "#000000" }}>
          <Badge badgeContent={cartCount} color="error">
            <FiShoppingCart />
          </Badge>
        </IconButton>
        <IconButton onClick={handleProfileMenuOpen} sx={{ color: "#000000" }}>
          <FiUser />
        </IconButton>
      </>
    )}
  </>
);

// 🔹 Desktop View
const DesktopNavbar = ({
  searchTerm, handleSearchChange,
  notifications, cartCount, handleProfileMenuOpen
}) => (
  <>
    <Avatar
      src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
      alt="Logo"
      sx={{ width: 48, height: 48, cursor: "pointer", mr: 2 }}
    />

    <SearchWrapper>
      <SearchIconWrapper>
        <FiSearch />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </SearchWrapper>

    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
      <IconButton sx={{ color: "#000000" }}>
        <Badge badgeContent={notifications} color="error">
          <FiBell />
        </Badge>
      </IconButton>
      <IconButton sx={{ color: "#000000" }}>
        <Badge badgeContent={cartCount} color="error">
          <FiShoppingCart />
        </Badge>
      </IconButton>
      <IconButton onClick={handleProfileMenuOpen} sx={{ color: "#000000" }}>
        <FiUser />
      </IconButton>
    </Box>
  </>
);

// 🔹 Main Navbar Component
const Navbar = () => {
  const isMobile = useMediaQuery((theme) =>
    theme ? theme.breakpoints.down("sm") : '@media (max-width:600px)'
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartCount] = useState(5);
  const [notifications] = useState(3);

  const handleSearch = useCallback(
    debounce((searchTerm) => console.log("Searching for:", searchTerm), 300),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isMobile) handleSearch(e.target.value);
  };

  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);
  const handleMobileSearch = () => {
    if (searchTerm) handleSearch(searchTerm);
    setShowMobileSearch(false);
  };
  const handleCloseMobileSearch = () => {
    setSearchTerm("");
    setShowMobileSearch(false);
  };
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {isMobile ? (
            <MobileNavbar
              handleDrawerToggle={handleDrawerToggle}
              toggleMobileSearch={toggleMobileSearch}
              handleCloseMobileSearch={handleCloseMobileSearch}
              handleSearchChange={handleSearchChange}
              handleMobileSearch={handleMobileSearch}
              searchTerm={searchTerm}
              showMobileSearch={showMobileSearch}
              cartCount={cartCount}
              notifications={notifications}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          ) : (
            <DesktopNavbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              notifications={notifications}
              cartCount={cartCount}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          )}

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
