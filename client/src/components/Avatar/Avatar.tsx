import React from 'react';
import Avatar from '@mui/material/Avatar';

import './Avatar.css';

interface Props {
  children: React.ReactElement<any>
}

export default function CustomAvatar({ children }: Props) {
  return (
    <Avatar className="LoginAvatar">
      {children}
    </Avatar>
  )
}
