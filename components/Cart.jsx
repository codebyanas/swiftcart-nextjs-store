'use client';

import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, Button, IconButton, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiMinus, FiPlus, FiShoppingBag  } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Image from 'next/image';

// 🔹 Styles
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
  color: 'rgb(125, 135, 156)',
});

// 🔹 Components
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
        <Typography variant="subtitle1">{product.name}</Typography>
        <Typography>${(product.price * product.quantity).toFixed(2)}</Typography>
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
      <RemoveIcon onClick={() => onRemove(product.id)}>
        <IoClose />
      </RemoveIcon>
    </Box>
  );
};

// 🔹 Main Component
const Cart = ({ open, onClose, setCartCount }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Red T-Shirt', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 19.99, quantity: 1 },
    { id: 2, name: 'Blue Jeans', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 49.99, quantity: 1 },
    { id: 3, name: 'White Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', price: 69.99, quantity: 1 },
  ]);

  useEffect(() => {
    const count = products.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [products, setCartCount]);

  const handleRemoveProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setProducts((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartDrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
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
        <IconButton onClick={onClose}>
          <IoClose />
        </IconButton>
      </Box>
      <Divider 
      sx={{
        marginBottom: '12px'
      }}
      />
      {products.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
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
        </>
      )}
    </CartDrawer>
  );
};

export default Cart;
