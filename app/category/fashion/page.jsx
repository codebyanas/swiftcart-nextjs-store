'use client'

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Select } from '@mui/material';
import Slider from '@mui/material/Slider';
import SellIcon from '@mui/icons-material/Sell';
import FashionProducts from '@/components/Products/FashionProducts';

// Define sort options
const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'lowToHigh', label: 'Price low to high' },
  { value: 'highToLow', label: 'Price high to low' },
  { value: 'date', label: 'Date' },
];

const sidebarWidth = 260;

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: sidebarWidth,
  [theme.breakpoints.up('sm')]: {
    position: 'sticky',
    top: 80,
    alignSelf: 'flex-start',
  },
}));

const EcommerceSidebar = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  const [value, setValue] = useState([0, 100]);

  const subcategory = ['Laptops', 'Smartphones', 'Cameras', 'Headphones', 'Gaming Consoles'];

  const handleFilterChange = (filter) => {
    setSelectedFilter(prev => (prev === filter ? '' : filter));
  };
  

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 2, pt: 2, mb: 6}}>
        {/* Sidebar */}
        <SidebarContainer sx={{ display: { xs: 'none', md: 'block' }, width: {md: '280px'} }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SortIcon sx={{ color: '#D23F57', fontSize: 20, mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 18 }}>
                Filters
              </Typography>
            </Box>
          </Toolbar>

          <Box sx={{ px: 2 }}>
            <FormGroup>
              {subcategory.map((filter) => (
                <FormControlLabel
                  key={filter}
                  control={
                    <Checkbox
                      sx={{
                        color: '#D23F57',
                        '&.Mui-checked': {
                          color: '#D23F57',
                        },
                      }}
                      checked={selectedFilter === filter}
                      onChange={() => handleFilterChange(filter)}
                    />
                  }
                  label={<Typography sx={{ fontSize: 14 }}>{filter}</Typography>}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Price Range */}
          {/* <Toolbar sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SellIcon sx={{ color: '#D23F57', fontSize: 20, mr: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 18 }}>
                Price Range
              </Typography>
            </Box>
          </Toolbar>

          <Box sx={{ px: 2 }}>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={1}
              sx={{
                color: '#D23F57',
              }}
            />
          </Box> */}
        </SidebarContainer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, pl: { sm: 3 }, mt: 2 }}>
          {/* Sort by */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: 2,
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                color: '#757575',
                fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                fontSize: '16px',
              }}
            >
              Sort by:
            </Typography>

            <FormControl
              sx={{
                minWidth: 180,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#757575',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D23F57',
                  },
                },
              }}
              size="small"
            >
              <Select
                value={sortOption}
                onChange={handleSortChange}
                displayEmpty
                aria-label="Sort products by"
                sx={{
                  fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                  fontSize: '16px',
                }}
              >
                {sortOptions.map(({ value, label }) => (
                  <MenuItem
                    key={value}
                    value={value}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#ef5350',
                        color: '#fff',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: '#424242',
                        fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <FashionProducts sortOption={sortOption} selectedFilters={selectedFilter ? [selectedFilter] : []} />
        </Box>
      </Box>
    </>
  );
};

export default EcommerceSidebar;