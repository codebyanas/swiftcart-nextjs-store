'use client'

import * as React from 'react';
import {
  Card, CardMedia, CardActions, Box,
  IconButton, Typography, Grid, useMediaQuery, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import posts from '@/data/flashdealsposts';

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
  <Card sx={{ width: 160, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: '0px',
          color: 'rgb(210, 63, 87)'
        }}
      >
        ${post.price}
      </Typography>
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
  <Card sx={{ width: 320, height: 380, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          marginBottom: '4px'
        }}
      >
        {post.title}
      </Typography>
      <Rating size="small" value={post.rating} precision={0.5} readOnly />
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '14px',
          fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginTop: '4px',
          margin: '0px',
          color: 'rgb(210, 63, 87)'
        }}
      >
        ${post.price}
      </Typography>
    </Box>
    <CardActions disableSpacing sx={{ px: 2, pt: 1 }}>
      <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
      <IconButton aria-label="share"><ShareIcon /></IconButton>
      <IconButton sx={{ marginLeft: 'auto', color: '#D23F57' }} aria-label="add to cart">
        <ShoppingCartIcon />
      </IconButton>
    </CardActions>
  </Card >
);

export default function FashionProducts({ sortOption, selectedFilters }) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');

  // Filter posts based on selectedFilters (subcategory)
  const filteredPosts = selectedFilters.length
    ? posts.filter(post => selectedFilters.includes(post.subcategory))
    : posts;

  // 🔹 Sort posts based on selected sortOption
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === 'highToLow') {
      return b.price - a.price;
    }
    return a.price - b.price; // Default and 'lowToHigh'
  });

  return (
    <>
      {sortedPosts.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ marginTop: 4, fontWeight: 'bold', color: 'gray' }}
        >
          No products found for the selected category.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {sortedPosts.map((post) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              lg={3}
              key={post.id}
              onClick={() => router.push(`/product/${post.slug}`)}
            >
              {isMobile ? <MobileCard post={post} /> : <DesktopCard post={post} />}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}



