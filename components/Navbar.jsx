'use client';

import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, Badge, InputBase, Menu, MenuItem, Box,
  useMediaQuery, Drawer, Container, Avatar, Typography, Divider, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FiSearch, FiShoppingCart, FiUser, FiBell, FiX, FiShoppingBag,
  FiMinus, FiPlus, FiTrash
} from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import debounce from 'lodash/debounce';
import Image from 'next/image';

// 🔹 Styles
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  boxShadow: 'none',
});

const SearchWrapper = styled(Box)({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: '#f5f5f5',
  marginRight: '16px',
  marginLeft: '16px',
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  alignItems: 'center',
});

const StyledInputBase = styled(InputBase)({
  color: '#000000',
  width: '100%',
  padding: '8px 40px 8px 48px',
  '& .MuiInputBase-input': {
    color: '#000000',
  },
});

const SearchIconWrapper = styled(Box)({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#666666',
});

const CloseIconWrapper = styled(IconButton)({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#666666',
  padding: '4px',
});

const CartDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 360,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      width: '92%',
      margin: '0 auto',
      borderRadius: 12,
    },
  },
}));

const QuantityButton = styled(IconButton)(({ disabled }) => ({
  border: '1px solid #ccc',
  borderRadius: 6,
  padding: 4,
  color: disabled ? '#D23F57' : '#000',
}));

const RemoveIcon = styled(IconButton)({
  color: 'rgb(125, 135, 156)'
});

// 🔹 Product in Cart
const ProductItem = ({ product, onUpdateQty, onRemove }) => {
  const handleDecrease = () => {
    if (product.quantity > 1) {
      onUpdateQty(product.id, product.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQty(product.id, product.quantity + 1);
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Image
        src={product.image}
        alt={product.name}
        width={70}
        height={70}
        sizes="100vw"
        style={{
          borderRadius: '8px',
          objectFit: 'cover',
          marginRight: '12px',
        }}
      />
      <Box flexGrow={1}>
        <Typography
          sx={{
            margin: '0px',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: '"Public Sans", "Public Sans Fallback"',
            lineHeight: '1.6',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          variant="subtitle1">{product.name}</Typography>
        <Typography
          sx={{
            fontFamily: '"Public Sans", "Public Sans Fallback"',
            fontWeight: '400',
            lineHeight: '1.5',
            color: 'rgb(125, 135, 156)',
            fontSize: '14px',
            margin: '0px 0px 8px',
          }}
          >${(product.price * product.quantity).toFixed(2)}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <QuantityButton onClick={handleDecrease} disabled={product.quantity === 1}>
            <FiMinus size={12} />
          </QuantityButton>
          <Typography mx={1}>{product.quantity}</Typography>
          <QuantityButton onClick={handleIncrease}>
            <FiPlus size={12} />
          </QuantityButton>
        </Box>
      </Box>
      <Box textAlign="right">
        <RemoveIcon onClick={() => onRemove(product.id)}>
          <IoClose />
        </RemoveIcon>
      </Box>
    </Box>
  );
};

// 🔹 Unified Navbar
const UnifiedNavbar = ({ searchTerm, handleSearchChange, cartCount, notifications, handleCartOpen, handleProfileMenuOpen }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    if (isMobile) {
      setIsSearchActive(true);
    }
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchTerm(''); // Optional: Clear search term when closing
  };

  const handleSearchBlur = () => {
    if (isMobile && !searchTerm) {
      setIsSearchActive(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" width="100%">
      <Avatar
        src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
        alt="Logo"
        sx={{ width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, cursor: 'pointer', mr: 2, display: isMobile && isSearchActive ? 'none' : 'block' }}
      />
      {isMobile && isSearchActive ? (
        <SearchWrapper sx={{ flexGrow: 1 }}>
          <SearchIconWrapper><FiSearch /></SearchIconWrapper>
          <StyledInputBase 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            onBlur={handleSearchBlur} 
            autoFocus 
          />
          <CloseIconWrapper onClick={handleSearchClose}>
            <FiX size={16} />
          </CloseIconWrapper>
        </SearchWrapper>
      ) : (
        <>
          {!isMobile && (
            <SearchWrapper sx={{ flexGrow: 1 }}>
              <SearchIconWrapper><FiSearch /></SearchIconWrapper>
              <StyledInputBase placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} />
            </SearchWrapper>
          )}
          <Box sx={{ 
            ml: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, md: 2 },
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 'auto',
            visibility: isMobile && isSearchActive ? 'hidden' : 'visible'
          }}>
            {isMobile && (
              <IconButton sx={{ color: '#000000' }} onClick={handleSearchClick}>
                <FiSearch />
              </IconButton>
            )}
            <IconButton sx={{ color: '#000000' }}>
              <Badge badgeContent={notifications} color="error">
                <FiBell />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: '#000000' }} onClick={handleCartOpen}>
              <Badge badgeContent={cartCount} color="error">
                <FiShoppingCart />
              </Badge>
            </IconButton>
            <IconButton onClick={handleProfileMenuOpen} sx={{ color: '#000000' }}>
              <FiUser />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

// 🔹 Main Component
const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Red T-Shirt', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 19.99, quantity: 1 },
    { id: 2, name: 'Blue Jeans', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 49.99, quantity: 1 },
    { id: 3, name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 69.99, quantity: 1 },
  ]);

  const cartCount = products.reduce((sum, item) => sum + item.quantity, 0);
  const notifications = 3;

  const handleSearch = useCallback(debounce((term) => {
    console.log('Searching for:', term);
  }, 300), []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isMobile) handleSearch(e.target.value);
  };

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setProducts((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl" sx={{ paddingX: 0 }}> {/* Remove or reduce padding */}
      <Toolbar sx={{ paddingX: 2, justifyContent: 'space-between' }}>
          <UnifiedNavbar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            cartCount={cartCount}
            notifications={notifications}
            handleCartOpen={handleCartOpen}
            handleProfileMenuOpen={handleProfileMenuOpen}
          />

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem>My Account</MenuItem>
            <MenuItem>Orders</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>

      {/* 🔹 Cart Drawer */}
      <CartDrawer anchor="right" open={cartOpen} onClose={handleCartClose}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <FiShoppingBag size={20} />
            <Typography
              sx={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: '"Public Sans", "Public Sans Fallback"',
                lineHeight: 1.6,
              }}
              variant="h6">Your Cart</Typography>
          </Box>
          <IconButton onClick={handleCartClose}><FiX /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onUpdateQty={updateQuantity}
            onRemove={handleRemoveProduct}
          />
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography
          sx={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 500,
            fontFamily: '"Public Sans", "Public Sans Fallback"',
            lineHeight: 1.6,
          }}
          variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#D23F57',
            '&:hover': { backgroundColor: '#b2364a' },
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: '"Public Sans", "Public Sans Fallback"',
            lineHeight: '1.6',
            textTransform: 'none',
          }}
        >
          Checkout
        </Button>
      </CartDrawer>
    </StyledAppBar>
  );
};

export default Navbar;