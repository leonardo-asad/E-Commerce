import React from 'react';
import './EmptyProducts.css'

interface Props {
  children: string,
  imageUrl: string
}

export default function EmptyProductsMessage({ children, imageUrl }: Props) {
  return (
    <div id='empty-products-container'>
      <img src={imageUrl} alt={children} id='alert-image' />
      <h1>{children}</h1>
    </div>
  )
}
