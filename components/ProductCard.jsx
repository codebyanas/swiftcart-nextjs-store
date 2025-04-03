'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';

export default function ProductCard() {
  const [value, setValue] = React.useState(4); // Rating value
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  return (
      <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginLeft: '32px' }}>
      {/* Sale/Discount Badge */}
      <Box sx={{ 
        position: 'absolute', 
        top: 10, 
        right: 10, 
        bgcolor: '#D23F57', 
        color: 'white', 
        px: 1, 
        py: 0.5, 
        borderRadius: 1,
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 1
      }}>
        20% OFF
      </Box>

      <CardMedia
        component="img"
        height="240"
        image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
        alt="Wireless Headphones"
        sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
      />
      
      <CardContent sx={{ pt: 1 }}>
        {/* Category */}
        <Typography variant="caption" color="text.secondary">
          Electronics
        </Typography>
        
        {/* Product Title */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt: 0.5 }}>
          Wireless Bluetooth Headphones
        </Typography>
        
        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Rating 
            name="product-rating" 
            value={value} 
            precision={0.5} 
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary">
            (24 reviews)
          </Typography>
        </Stack>
        
        {/* Price */}
        <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
          <Typography variant="h6" color="#D23F57" sx={{ fontWeight: 'bold' }}>
            $59.99
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            $74.99
          </Typography>
        </Stack>
      </CardContent>
      
      <Divider sx={{ mx: 2 }} />
      
      <CardActions disableSpacing sx={{ justifyContent: 'space-between', p: 2 }}>
        {/* Wishlist Button */}
        <IconButton 
          aria-label="add to favorites" 
          onClick={toggleFavorite}
          sx={{ color: isFavorite ? '#D23F57' : 'inherit' }}
        >
          <FavoriteBorderIcon />
        </IconButton>
        
        {/* Share Button */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
        {/* Add to Cart Button */}
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          sx={{ 
            backgroundColor: '#D23F57',
            '&:hover': {
              backgroundColor: '#B2374A'
            },
            borderRadius: 2,
            ml: 'auto'
          }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>

  );
}