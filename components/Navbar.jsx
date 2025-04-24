'use client';

import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, Badge, Box, useMediaQuery,
  Container, Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiShoppingCart } from 'react-icons/fi';
import debounce from 'lodash/debounce';
import SearchBar from '@/components/SearchBar';
import Cart from '@/components/Cart';
import UserMenu from '@/components/UserMenu';
import Image from 'next/image';

// 🔹 Styles
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
});

// 🔹 Components
const MobileNavbar = ({ cartCount, handleCartOpen, handleProfileMenuOpen, searchTerm, handleSearchChange }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
    <Image
      src="https://i.postimg.cc/QtTKL688/1-1.png"
      alt="Logo"
      width={135}
      height={35}
    />
    <Box display="flex" gap={0.5}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <IconButton onClick={handleCartOpen}>
        <Badge badgeContent={cartCount} color="error">
          <FiShoppingCart />
        </Badge>
      </IconButton>
      <UserMenu onProfileMenuOpen={handleProfileMenuOpen} />
    </Box>
  </Box>
);

const DesktopNavbar = ({ cartCount, handleCartOpen, handleProfileMenuOpen, searchTerm, handleSearchChange }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
    <Image
      src="https://i.postimg.cc/QtTKL688/1-1.png"
      alt="Logo"
      width={143}
      height={40}
    />
    <SearchBar sx={{ flexGrow: 1, marginRight: 2 }}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
    />
    <Box display="flex" gap={0.5}>
      <IconButton onClick={handleCartOpen}>
        <Badge badgeContent={cartCount} color="error">
          <FiShoppingCart />
        </Badge>
      </IconButton>
      <UserMenu onProfileMenuOpen={handleProfileMenuOpen} />
    </Box>
  </Box>
);

// 🔹 Main Component
const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    debounce((term) => {
      console.log('Searching for:', term);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleProfileMenuOpen = (e) => {
    console.log('Profile menu opened', e.currentTarget);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl" disableGutters>
        <Toolbar sx={{ px: 2 }}>
          {isMobile ? (
            <MobileNavbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              cartCount={cartCount}
              handleCartOpen={handleCartOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          ) : (
            <DesktopNavbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              cartCount={cartCount}
              handleCartOpen={handleCartOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          )}
        </Toolbar>
      </Container>
      <Cart
        open={cartOpen}
        onClose={handleCartClose}
        setCartCount={setCartCount}
      />
    </StyledAppBar>
  );
};


export default Navbar;