'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import { styled } from '@mui/material/styles';
import ElectronicsProducts from '@/components/Products/ElectronicsProducts';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import SortIcon from '@mui/icons-material/Sort';
import FashionProducts from '@/components/Products/FashionProducts';

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

        </div>
    );


    const container = window !== undefined ? () => window().document.body : undefined;

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

                    <FashionProducts />
                </Box>
            </Box>
        </>
    );
}

EcommerceSidebar.propTypes = {
    window: PropTypes.func,
};

export default EcommerceSidebar;