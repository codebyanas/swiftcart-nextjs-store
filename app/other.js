'use client'

import * as React from 'react';
import {
  Card, CardHeader, CardMedia, CardActions, Box,
  IconButton, Typography, Grid, useMediaQuery, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// 🔸 Add ratings to post data (optional)
const posts = [
  { id: 1, subheader: "Clothes", title: "Shrimp and Chorizo Paella", image: "https://plus.unsplash.com/premium_photo-1681412205359-a803b2649d57?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", avatar: "R", rating: 4.5 },
  { id: 2, subheader: "Clothes", title: "Classic Margherita Pizza", image: "https://images.unsplash.com/photo-1742475701265-c55a6506722b?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", avatar: "M", rating: 4 },
  { id: 3, subheader: "Clothes", title: "Grilled Salmon with Asparagus Grilled Salmon with Asparagus Grilled Salmon with Asparagus", image: "/static/images/cards/salmon.jpg", avatar: "S", rating: 3.5 },
  { id: 4, subheader: "Shoes", title: "Stylish Ultra", image: "/static/images/cards/salmon.jpg", avatar: "S", rating: 5 },
];

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
  <Card sx={{ width: 160, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <CardMedia component="img" height="130" image={post.image} alt={post.title} />
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
    <CardMedia component="img" height="230" image={post.image} alt={post.title} />
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

export default function ProductCard() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Grid container spacing={2} justifyContent="center">
      {posts.map((post) => (
        <Grid item xs={6} sm={6} md={3} lg={3} key={post.id}>
          {isMobile ? <MobileCard post={post} /> : <DesktopCard post={post} />}
        </Grid>
      ))}
    </Grid>
  );
}
