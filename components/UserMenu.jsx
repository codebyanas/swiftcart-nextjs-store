'use client';

import React from 'react';
import { IconButton } from '@mui/material';
import { FiUser } from 'react-icons/fi';

// 🔹 Main Component
const UserMenu = ({ onProfileMenuOpen }) => {
  return (
    <IconButton onClick={onProfileMenuOpen}>
      <FiUser />
    </IconButton>
  );
};

export default UserMenu;