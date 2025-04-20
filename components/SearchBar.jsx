'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase, IconButton, Button, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// 🔹 Styled Components
const SearchContainer = styled(Box)(({ theme, isActive }) => ({
  position: isActive ? 'fixed' : 'relative',
  top: isActive ? 0 : 'auto',
  left: isActive ? 0 : 'auto',
  right: isActive ? 0 : 'auto',
  zIndex: isActive ? 1000 : 'auto',
  backgroundColor: isActive ? '#fff' : '#f5f5f5',
  borderRadius: isActive ? 0 : '24px',
  margin: isActive ? 0 : theme.spacing(0, 2),
  padding: isActive ? theme.spacing(1) : 0,
  width: isActive ? '100%' : '100%',
  maxWidth: isActive ? 'none' : '600px',
  height: isActive ? '56px' : 'auto',
  display: 'flex',
  alignItems: 'center',
  boxShadow: isActive ? theme.shadows[1] : 'none',
  transition: 'all 0.3s ease',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1, 6, 1, 6),
  fontSize: '1rem',
  '& .MuiInputBase-input': {
    color: '#000',
    '&::placeholder': {
      color: '#666',
      opacity: 1,
    },
  },
}));

const IconWrapper = styled(IconButton)(({ theme, position }) => ({
  position: 'absolute',
  [position]: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#666',
  padding: theme.spacing(0.5),
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  textTransform: 'none',
  padding: theme.spacing(0.5, 2),
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

// 🔹 Mobile Search Component
const MobileSearch = ({ searchTerm, onSearchChange, handleSearch }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef(null);

  const handleClose = () => {
    setIsSearchActive(false);
    onSearchChange?.({ target: { value: '' } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleBackButton = () => {
      if (isSearchActive) {
        handleClose();
        return false;
      }
      return true;
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isSearchActive]);

  if (!isSearchActive) {
    return (
      <IconButton aria-label="Open search" onClick={() => setIsSearchActive(true)} >
        <FiSearch size={24} />
      </IconButton>
    );
  }

  return (
    <SearchContainer ref={searchRef} isActive={isSearchActive}>
      <StyledInputBase 
        placeholder="Search products..."
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        autoFocus
        sx={{
          padding: (theme) => theme.spacing(1, 2), // Adjust padding to align visually
        }}
      />
      <SearchButton 
        onClick={handleSearch} 
        aria-label="Search"
        sx={{
          marginRight: '32px',
          background: '#D23F57',
          '&:hover': {
            background: '#B03045', // Correct hover styling
          },
        }}
      >
        Search
      </SearchButton>
    </SearchContainer>
  );  
};

// 🔹 Desktop Search Component
const DesktopSearch = ({ searchTerm, onSearchChange, handleSearch }) => (
  <SearchContainer isActive={false}>
    <IconWrapper position="left">
      <FiSearch size={20} />
    </IconWrapper>
    <StyledInputBase
      placeholder="Search products..."
      value={searchTerm}
      onChange={onSearchChange}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
  </SearchContainer>
);

// 🔹 Main Component
const SearchBar = ({ searchTerm, onSearchChange, sx }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Box sx={sx}>
      {isMobile ? (
        <MobileSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          handleSearch={handleSearch}
        />
      ) : (
        <DesktopSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          handleSearch={handleSearch}
        />
      )}
    </Box>
  );
};

export default SearchBar;
