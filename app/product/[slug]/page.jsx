'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
} from '@mui/material';
import { Star, Favorite, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import posts from '@/data/flashdealsposts'; // Example data source

const SIZES = ['SM', 'M', 'L', 'XL'];

const RatingStars = React.memo(({ rating }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        sx={{
          color: index < Math.floor(rating) ? '#D23F57' : '#D23F57',
          fontSize: 16,
          opacity: index < Math.floor(rating) ? 1 : 0.5,
        }}
      />
    ))}
  </Box>
));

const ProductDetail = ({ params: { slug } }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = await new Promise((resolve) =>
          setTimeout(() => resolve(posts.find((item) => item.slug === slug)), 500)
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleSizeSelect = useCallback(() => {
    // Implement size selection logic
  }, []);

  if (loading) {
    return (
      <Box sx={{
        p: 8,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <CircularProgress sx={{ color: 'red' }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 8, textAlign: 'center' }}>
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          Product not found!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ color: 'text.secondary', overflow: 'hidden' }}>
      <Container sx={{ px: { xs: 2, sm: 5 }, py: 8, width: '100%' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Top - Image */}
          <Grid item xs={12} md={6}>
            <Image
              src={product.image}
              alt={`${product.title} product image`}
              width={400}
              height={400}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Grid>

          {/* Bottom - Content */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              marginLeft: {
                xs: 0,      // No margin on mobile (0px)
                md: '42px'  // 42px margin from md breakpoint (960px) and up
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ letterSpacing: 2 }}>
                {product.subheader || 'BRAND NAME'}
              </Typography>
              <Typography variant="h4" component="h1" sx={{
                mb: 1,
                fontSize: '30px',
                fontWeight: 500,
                lineHeight: 1.5,
                fontFamily: '"Public Sans", "Public Sans Fallback"'
              }}>
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <RatingStars
                  rating={product.rating}
                  sx={{ color: '#D23F57' }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    ml: 1,
                    fontWeight: 300 // Optional: if you want to make the text bolder
                  }}
                >
                  {`${product.rating} Reviews`}
                </Typography>
              </Box>

              <Box sx={{ minHeight: 60, display: 'flex', alignItems: 'center', maxWidth: 600 }}>
                <Typography
                  paragraph
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {product.description || 'Detailed product description.'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, marginBottom: '10px' }}>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel
                    id="size-select-label"
                    sx={{
                      color: 'rgba(0, 0, 0, 0.6)', // Default color
                      '&.Mui-focused': {
                        color: '#D23F57', // Focus color matches border
                      },
                    }}
                  >
                    Size
                  </InputLabel>
                  <Select
                    labelId="size-select-label"
                    label="Size"
                    defaultValue="SM"
                    IconComponent={ExpandMore}
                    onChange={handleSizeSelect}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D23F57',
                        borderWidth: '1px',
                      },
                      '&:hover + .MuiInputLabel-root': { // Targets the label when Select is hovered
                        color: 'black', // Black color on hover
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D23F57',
                        borderWidth: '1px',
                      },
                    }}
                  >
                    {SIZES.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h5" component="span" 
                sx={{ 
                  margin: '0 0 4px',         // equivalent to margin: 0px 0px 4px
                  fontSize: '25px',          // font-size: 25px
                  fontWeight: 500,           // font-weight: 600
                  fontFamily: '"Public Sans", "Public Sans Fallback"', // font-family
                  color: 'rgb(210, 63, 87)', // color: rgb(210, 63, 87)
                  lineHeight: 1,              // line-height: 1
                 }}>
                  ${product.price}
                </Typography>
                <Button variant="contained" sx={{ py: 1, px: 3, ml: 'auto', background: '#D23F57', fontFamily: '"Public Sans", "Public Sans Fallback"', borderRadius: '6px' }}>
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
};

export default React.memo(ProductDetail);