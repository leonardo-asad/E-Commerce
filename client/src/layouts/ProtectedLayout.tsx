import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsLoadingUser } from '../store/userSlice/userSlice';
import CircularIndeterminate from '../components/LoadingIcon/CircularIndeterminate';

export default function ProtectedLayout() {
  const outlet = useOutlet();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoadingUser = useSelector(selectIsLoadingUser);

  if (isLoadingUser) {
    return <CircularIndeterminate />
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />
  };

  return (
    <>
    {outlet}
    </>
  )
}
