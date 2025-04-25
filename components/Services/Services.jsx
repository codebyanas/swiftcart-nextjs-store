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
import posts from '@/data/flashdealsposts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
  <Card sx={{ width: 160, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

    <Image
      src={post.image}
      alt={post.title}
      width={0}  // This will be overridden by the parent container
      height={100}
      style={{
        width: '100%',
        objectFit: 'cover',
        backgroundColor: '#f5f5f5',
      }}
      sizes="100vw"
    />


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
    <Card
      sx={{
        width: 326,
        height: 270,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Image
        src={post.image}
        alt={post.title}
        width={0} // This will be overridden by the parent container
        height={80}
        sizes="100vw"
        style={{
          width: 'calc(100% - 240px)', // Subtract 40px for horizontal margins (20px on each side)
          margin: '0 auto',
          marginTop: '40px',
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      />
  
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          pt: 2,
          textAlign: 'center',
          flexGrow: 1, // Ensures the box grows to occupy available space
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '14px',
            color: 'rgb(67, 77, 95)',
            fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
            lineHeight: 1.5,
            marginBottom: '8px',
          }}
        >
          Worldwide Delivery
        </Typography>
  
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '14px',
            color: 'rgb(125, 135, 156)',
            fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
            lineHeight: 1.5,
          }}
        >
          We offer competitive prices on our 100 million plus product range. Shop with confidence.
        </Typography>
      </Box>
    </Card>
  );
  
  

export default function Services() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          ml: isMobile ? 0 : 0,
        }}
      >
      </Box>

      <Grid
        container justifyContent="center"
        spacing={1}
        sx={{
          mx: isMobile ? 1 : 1, // Add margin-left and margin-right (16px mobile, 32px desktop)
          mb: 6
        }}
      >
        {posts.map((post) => (
          <Grid item xs={6} sm={6} md={3} key={post.id}
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

