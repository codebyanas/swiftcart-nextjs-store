import React, { useState } from 'react';
import { Box, InputBase, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; // Updated import

// 🔹 Styles
const SearchWrapper = styled(Box)({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: '#f5f5f5',
  marginRight: '16px',
  marginLeft: '16px',
  width: '100%',
  maxWidth: '600px',
  display: 'flex',
  alignItems: 'center',
});

const StyledInputBase = styled(InputBase)({
  color: '#000000',
  width: '100%',
  padding: '8px 40px 8px 48px',
  '& .MuiInputBase-input': {
    color: '#000000',
  },
});

const SearchIconWrapper = styled(Box)({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#666666',
});

const CloseIconWrapper = styled(IconButton)({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#666666',
  padding: '4px',
});

const SearchBar = ({ searchTerm, onSearchChange, sx }) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (isMobile) {
      setIsSearchActive(true);
    }
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    onSearchChange?.({ target: { value: '' } });
  };

  const handleSearchBlur = () => {
    if (isMobile && !searchTerm) {
      setIsSearchActive(false);
    }
  };

  if (isMobile && !isSearchActive) {
    return (
      <IconButton sx={{ color: '#000000' }} onClick={handleSearchClick}>
        <FiSearch />
      </IconButton>
    );
  }

  return (
    <SearchWrapper sx={{ flexGrow: isMobile ? 1 : 0, ...sx }}>
      <SearchIconWrapper>
        <FiSearch />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search products..."
        value={searchTerm}
        onChange={onSearchChange}
        onKeyDown={handleKeyDown}
        onBlur={handleSearchBlur}
        autoFocus={isMobile}
      />
      {isMobile && (
        <CloseIconWrapper onClick={handleSearchClose}>
          <FiX size={16} />
        </CloseIconWrapper>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;