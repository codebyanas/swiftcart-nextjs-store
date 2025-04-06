'use client'

import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ElectronicsProducts from '@/components/Products/ElectronicsProducts';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Select } from '@mui/material';
import Slider from '@mui/material/Slider';
import SellIcon from '@mui/icons-material/Sell';


const sidebarWidth = 240;

// Styled component for category section
const CategorySection = styled(Box)(({ theme }) => ({
    width: sidebarWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    height: '100%',
    position: 'fixed',
    top: '64px', // Below AppBar
    left: 0,
}));

function EcommerceSidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [sortOption, setSortOption] = useState('relevance');
    const [value, setValue] = useState([0, 100]); // Default value (full range from 0 to 100)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    };

    const handleSidebarToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // E-commerce categories
    const electronicsFilters = [
        'Laptops',
        'Smartphones',
        'Cameras',
        'Headphones',
        'Gaming Consoles',
    ];


    const categoryList = (
        <div>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SortIcon sx={{
                        color: '#D23F57',
                        fontSize: '20px',
                        ml: -0.8,
                        mr: 1.5 // margin-right for spacing
                    }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#2b3445',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                            fontSize: '18px',
                            textAlign: 'left',
                            marginLeft: '-8px'
                        }}
                    >
                        Filters
                    </Typography>
                </Box>
            </Toolbar>
            <Box sx={{
                px: 2,
                flexGrow: 1,
                color: '#2b3445',
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                fontSize: '14px',
                textAlign: 'left',
                marginLeft: '-8px'
            }}>
                <FormGroup>
                    {electronicsFilters.map((filter) => (
                        <FormControlLabel
                            key={filter}
                            control={
                                <Checkbox
                                    sx={{
                                        ml: 1,
                                        color: '#D23F57', // color of the unchecked box and checkmark
                                        '&.Mui-checked': {
                                            color: '#D23F57', // color when checked
                                        },
                                    }}
                                    checked={selectedFilters.includes(filter)}
                                    onChange={() => handleFilterChange(filter)}
                                />
                            }
                            label={
                                <Typography
                                    sx={{
                                        color: '#2b3445',
                                        fontWeight: 400,
                                        lineHeight: 2,
                                        fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                                        fontSize: '14px',
                                        textAlign: 'left'
                                    }}
                                >
                                    {filter}
                                </Typography>
                            }
                        />
                    ))}
                </FormGroup>




            </Box>

            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SellIcon sx={{
                        color: '#D23F57',
                        fontSize: '20px',
                        ml: -0.8,
                        mr: 1.5 // margin-right for spacing
                    }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#2b3445',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                            fontSize: '18px',
                            textAlign: 'left',
                            marginLeft: '-8px'
                        }}
                    >
                        Price Range
                    </Typography>
                </Box>
            </Toolbar>

            <FormGroup
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    position: 'fixed',
                    left: 0,
                    width: sidebarWidth,
                }}
            >
                <Box sx={{ px: 2 }}>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$${value}`}
                        min={0}
                        max={100}
                        step={1}
                        sx={{
                            color: '#757575',
                            '& .MuiSlider-rail': {
                                backgroundColor: '#ef5350', // Light background color
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: '#D23F57', // Slider track color
                                borderColor: '#D23F57',
                                height: 0.1,  // Adjust the height of the thumb to reduce its size
                            },
                            '& .MuiSlider-thumb': {
                                backgroundColor: '#D23F57',
                                width: 14,   // Adjust the width of the thumb
                                height: 14,  // Adjust the height of the thumb to reduce its size
                                borderRadius: '50%',  // Keep it round
                            },
                            '& .MuiSlider-valueLabel': {
                                fontWeight: 100, // This sets the font weight to medium
                            },

                            '& .MuiSlider-root': {
                                '&:focus-visible': {
                                    outline: 'none', // Remove outline completely
                                },
                            },
                            '& .MuiSlider-mark': {
                                display: 'none', // Optionally, hide marks if they are not needed
                            },
                        }}
                    />
                </Box>
            </FormGroup>


        </div>
    );

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                {/* Sidebar Section */}
                <Box component="nav">
                    {/* Mobile view */}
                    <Box
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            position: 'fixed',
                            top: '64px',
                            left: mobileOpen ? 0 : -sidebarWidth,
                            width: sidebarWidth,
                            height: '100%',
                            backgroundColor: 'background.paper',
                            transition: 'left 0.3s ease-in-out',
                            zIndex: 1200,
                        }}
                    >
                        {categoryList}
                    </Box>

                    {/* Desktop view */}
                    <CategorySection
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            position: 'fixed',
                            top: '140px',
                            left: 0,
                            width: sidebarWidth,
                            height: '100%',
                        }}
                    >
                        {categoryList}
                    </CategorySection>
                </Box>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${sidebarWidth}px)` },
                        ml: { sm: `${sidebarWidth}px` },
                        mt: 0,
                    }}
                >

                    {/* Sort by */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',  // Aligns to the right side
                            mb: 2, // space below the sort row
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
                                    borderRadius: '8px',  // Add border radius here
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
                            >
                                <MenuItem
                                    value="relevance"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#ef5350',  // Change background color on hover
                                            color: '#fff',  // Text color when hovered
                                        }
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
                                        Relevance
                                    </Typography>

                                </MenuItem>
                                <MenuItem
                                    value="lowToHigh"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#ef5350',  // Change background color on hover
                                            color: '#fff',  // Text color when hovered
                                        }
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
                                        Price low to high
                                    </Typography>

                                </MenuItem>
                                <MenuItem
                                    value="highToLow"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#ef5350',  // Change background color on hover
                                            color: '#fff',  // Text color when hovered
                                        }
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
                                        Price high to low
                                    </Typography>

                                </MenuItem>
                                <MenuItem
                                    value="date"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#ef5350',  // Change background color on hover
                                            color: '#fff',  // Text color when hovered
                                        }
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
                                        Date
                                    </Typography>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Sidebar Toggle Button */}
                    <ElectronicsProducts />
                </Box>
            </Box>
        </>
    );
}

EcommerceSidebar.propTypes = {
    window: PropTypes.func,
};

export default EcommerceSidebar;