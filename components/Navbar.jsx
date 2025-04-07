'use client';

import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, Badge, InputBase, Menu, MenuItem, Box,
  useMediaQuery, Drawer, Container, Avatar, Typography, Divider, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FiSearch, FiShoppingCart, FiUser, FiBell, FiX, FiShoppingBag,
  FiMinus, FiPlus, FiTrash, FiMenu
} from 'react-icons/fi';
import debounce from 'lodash/debounce';

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
});

const StyledInputBase = styled(InputBase)({
  color: '#000000',
  width: '100%',
  padding: '8px 16px 8px 48px',
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

const CartDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: 360,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 16,
  },
});

const QuantityButton = styled(IconButton)(({ disabled }) => ({
  border: '1px solid #ccc',
  borderRadius: 6,
  padding: 4,
  color: disabled ? '#D23F57' : '#000',
}));

const RemoveIcon = styled(IconButton)({
  color: '#D23F57',
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
      <img src={product.image} alt={product.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', marginRight: 12 }} />
      <Box flexGrow={1}>
        <Typography variant="subtitle1" fontWeight={500}>{product.name}</Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <QuantityButton onClick={handleDecrease} disabled={product.quantity === 1}>
            <FiMinus />
          </QuantityButton>
          <Typography mx={1}>{product.quantity}</Typography>
          <QuantityButton onClick={handleIncrease}>
            <FiPlus />
          </QuantityButton>
        </Box>
      </Box>
      <Box textAlign="right">
        <Typography fontWeight={600}>${(product.price * product.quantity).toFixed(2)}</Typography>
        <RemoveIcon onClick={() => onRemove(product.id)}>
          <FiTrash />
        </RemoveIcon>
      </Box>
    </Box>
  );
};

// 🔹 Desktop Navbar
const DesktopNavbar = ({ searchTerm, handleSearchChange, cartCount, notifications, handleCartOpen, handleProfileMenuOpen }) => (
  <>
    <Avatar
      src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
      alt="Logo"
      sx={{ width: 48, height: 48, cursor: 'pointer', mr: 2 }}
    />
    <SearchWrapper>
      <SearchIconWrapper><FiSearch /></SearchIconWrapper>
      <StyledInputBase placeholder="Search products..." value={searchTerm} onChange={handleSearchChange} />
    </SearchWrapper>
    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
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
);

// 🔹 Mobile Navbar
const MobileNavbar = ({ toggleMobileSearch, showMobileSearch, handleSearchChange, handleMobileSearch, searchTerm, handleCartOpen }) => (
  <>
    <IconButton sx={{ color: '#000000', mr: 1 }}>
      <FiMenu />
    </IconButton>
    <Avatar
      src="https://images.unsplash.com/photo-1572177191856-3cde618dee1f"
      alt="Logo"
      sx={{ width: 40, height: 40, cursor: 'pointer', mr: 1 }}
    />
    {showMobileSearch ? (
      <Box display="flex" alignItems="center" flexGrow={1}>
        <IconButton onClick={toggleMobileSearch} sx={{ color: '#000000' }}><FiX /></IconButton>
        <InputBase
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          autoFocus
          sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 24,
            px: 2,
            flexGrow: 1,
            mx: 1,
          }}
        />
        <IconButton onClick={handleMobileSearch} sx={{ backgroundColor: '#D23F57', color: '#fff' }}>
          <FiSearch />
        </IconButton>
      </Box>
    ) : (
      <Box sx={{ ml: 'auto' }}>
        <IconButton sx={{ color: '#000000' }} onClick={toggleMobileSearch}><FiSearch /></IconButton>
        <IconButton sx={{ color: '#000000' }} onClick={handleCartOpen}>
          <Badge badgeContent={3} color="error"><FiShoppingCart /></Badge>
        </IconButton>
      </Box>
    )}
  </>
);

// 🔹 Main Component
const Navbar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Red T-Shirt', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', price: 19.99, quantity: 1 },
    { id: 2, name: 'Blue Jeans', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', price: 49.99, quantity: 1 },
    { id: 3, name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D', price: 69.99, quantity: 1 },
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

  const toggleMobileSearch = () => setShowMobileSearch(!showMobileSearch);
  const handleMobileSearch = () => {
    if (searchTerm) handleSearch(searchTerm);
    setShowMobileSearch(false);
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
      <Container maxWidth="xl">
        <Toolbar>
          {isMobile ? (
            <MobileNavbar
              toggleMobileSearch={toggleMobileSearch}
              showMobileSearch={showMobileSearch}
              handleSearchChange={handleSearchChange}
              handleMobileSearch={handleMobileSearch}
              searchTerm={searchTerm}
              handleCartOpen={handleCartOpen}
            />
          ) : (
            <DesktopNavbar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              cartCount={cartCount}
              notifications={notifications}
              handleCartOpen={handleCartOpen}
              handleProfileMenuOpen={handleProfileMenuOpen}
            />
          )}

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
            <Typography variant="h6" fontWeight={600}>Your Cart</Typography>
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
        <Typography variant="h6" fontWeight={600}>Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#D23F57', '&:hover': { backgroundColor: '#b2364a' } }}
        >
          Checkout
        </Button>
      </CartDrawer>
    </StyledAppBar>
  );
};

export default Navbar;
