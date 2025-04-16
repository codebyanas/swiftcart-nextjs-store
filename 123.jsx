'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import { Star, Favorite, ExpandMore } from '@mui/icons-material';

const ProductDetail = () => {
  return (
    <Box sx={{ color: 'text.secondary', overflow: 'hidden' }}>
      <Container sx={{ px: { xs: 2, sm: 5 }, py: 8, width: '100%' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Top - Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              alt="ecommerce"
              sx={{
                width: { xs: '100%', md: 'auto' },
                height: { xs: 'auto', md: '100%' },
                maxHeight: 400,
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 1,
                display: 'block',
                margin: { xs: '0 auto', md: 0 }
              }}
              src="https://dummyimage.com/400x400"
            />
          </Grid>

          {/* Bottom - Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ letterSpacing: 2 }}>
                BRAND NAME
              </Typography>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'medium', mb: 1 }}>
                The Catcher in the Rye
              </Typography>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} sx={{ color: 'primary.main', fontSize: 16 }} />
                  ))}
                  <Star sx={{ color: 'primary.main', fontSize: 16, opacity: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                    4 Reviews
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ minHeight: 100, display: 'flex', alignItems: 'center', maxWidth: 600 }}>
                <Typography
                  paragraph
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeram loFam locavore
                  kickstarter distillery. Mixtape chillwave tumeram loFam locavore kickstarter
                  distillery. Mixtape chillwave tumeram lo
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, marginBottom: '10px' }}>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel id="size-select-label">Size</InputLabel>
                  <Select
                    labelId="size-select-label"
                    label="Size"
                    defaultValue="SM"
                    IconComponent={ExpandMore}
                  >
                    <MenuItem value="SM">SM</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="XL">XL</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h5" component="span" sx={{ fontWeight: 'medium' }}>
                  $58.00
                </Typography>
                <Button variant="contained" sx={{ py: 1, px: 3, ml: 'auto' }}>
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
