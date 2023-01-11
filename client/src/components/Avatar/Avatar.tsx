// Import react library
import React from 'react';
// Import Avatar Component
import Avatar from '@mui/material/Avatar';
// Import Style Sheet
import './Avatar.css';

interface Props {
  children: React.ReactElement<any>
}

export default function CustomAvatar({ children }: Props) {
  return (
    <Avatar
    className="avatar"
    sx={{ bgcolor: "primary.main" }}
    >
      {children}
    </Avatar>
  )
}
