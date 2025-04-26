'use client'

import React from 'react';
import {
  Card, CardMedia, CardActions, Box,
  IconButton, Typography, useMediaQuery, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import posts from '@/data/flashdealsposts';
import Grid from '@mui/material/Grid';

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

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!query) {
    // Optional: Redirect back if no query is provided
    redirect('/');
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.subheader.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          ml: isMobile ? 2 : 6,
        }}
      >
        <ManageSearchOutlinedIcon sx={{ color: '#2b3445', fontSize: isMobile ? 26 : 30, mr: 0.5 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: isMobile ? '18px' : '25px',
            lineHeight: 1.5,
            color: '#2b3445',
            fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
            textAlign: isMobile ? 'left' : 'left',
            mx: isMobile ? 1 : 1,
          }}
        >
          Search Results for "{query}"
        </Typography>
      </Box>

      <Grid
        container justifyContent="space-between"
        spacing={1}
        sx={{
          mx: isMobile ? 1 : 1, // Add margin-left and margin-right (16px mobile, 32px desktop)
        }}
      >
        {filteredPosts.map(post => (
          <Grid size={{ xs: 6, sm: 6, md: 3 }} key={post.id}
            className="p-4 bg-white border rounded-lg shadow-md cursor-pointer"
            onClick={() => router.push(`/product/${post.slug}`)}>
            {isMobile ? (
              <MobileCard post={post} onClick={() => handleCardClick(post.slug)} />
            ) : (
              <DesktopCard post={post} onClick={() => handleCardClick(post.slug)} />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}