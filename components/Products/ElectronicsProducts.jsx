'use client'

import * as React from 'react';
import {
  Card, CardHeader, CardMedia, CardActions, Box,
  IconButton, Typography, Grid, useMediaQuery, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';

// 🔸 Add ratings to post data (optional)
const posts = [
  { id: 1, subheader: "Clothes", title: "Shrimp and Chorizo Paella", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D", avatar: "R", rating: 4.5 },
  { id: 2, subheader: "Clothes", title: "Classic Margherita Pizza", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D", avatar: "M", rating: 4 },
  { id: 3, subheader: "Clothes", title: "Grilled Salmon with Asparagus Grilled Salmon with Asparagus Grilled Salmon with Asparagus", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D", avatar: "S", rating: 3.5 },
  { id: 4, subheader: "Shoes", title: "Stylish Ultra", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww", avatar: "S", rating: 5 },
];

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
  <Card sx={{ width: 160, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <CardMedia component="img" height="130" image={post.image} alt={post.title}
      sx={{
        backgroundColor: '#f5f5f5', // optional to make empty space look intentional
      }} />
    <Box sx={{ px: 1, pt: 1 }}>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '12px',
          color: 'rgb(75, 86, 107)',
          fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.title}
      </Typography>
      <Rating size="small" value={post.rating} precision={0.5} readOnly />
    </Box>
    <CardActions disableSpacing sx={{ px: 1, pb: 1 }}>
      <IconButton aria-label="add to favorites"><FavoriteIcon fontSize="small" /></IconButton>
      <IconButton aria-label="share"><ShareIcon fontSize="small" /></IconButton>
      <IconButton sx={{ marginLeft: 'auto', color: '#D23F57' }} aria-label="add to cart">
        <ShoppingCartIcon />
      </IconButton>
    </CardActions>
  </Card>
);

// 🔹 Desktop Layout
const DesktopCard = ({ post }) => (
  <Card sx={{ width: 320, height: 370, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <CardMedia component="img" height="230" image={post.image} alt={post.title}
      sx={{
        backgroundColor: '#f5f5f5', // optional to make empty space look intentional
      }} />
    <Box sx={{ px: 2, pt: 1 }}>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '14px',
          color: 'rgb(75, 86, 107)',
          fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.title}
      </Typography>
      <Rating value={post.rating} precision={0.5} readOnly />
    </Box>
    <CardActions disableSpacing sx={{ px: 2, pt: 1 }}>
      <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
      <IconButton aria-label="share"><ShareIcon /></IconButton>
      <IconButton sx={{ marginLeft: 'auto', color: '#D23F57' }} aria-label="add to cart">
        <ShoppingCartIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default function ElectronicsProducts() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between">
        {posts.map((post) => (
          <Grid item xs={6} sm={6} md={3} lg={3} key={post.id}>
            {isMobile ? <MobileCard post={post} /> : <DesktopCard post={post} />}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

