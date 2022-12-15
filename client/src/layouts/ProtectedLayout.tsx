import React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsLoadingUser } from '../store/userSlice/userSlice';
import CircularIndeterminate from '../components/LoadingIcon/CircularIndeterminate';

export default function ProtectedLayout() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const outlet = useOutlet();

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
