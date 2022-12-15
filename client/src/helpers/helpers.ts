import * as Types from '../types/types';

const getProductIndex = (cartProducts: Types.CartProducts, productId: number) => {
  return cartProducts.findIndex(product => product.product_id === productId)
}

export const checkCartItem = (cartProducts: Types.CartProducts, productId: number) => {
  return getProductIndex(cartProducts, productId) !== -1;
};

export const getCartQuantity = (cartProducts: Types.CartProducts, productId: number) => {
  const index =  getProductIndex(cartProducts, productId)
  return cartProducts[index].quantity_order;
}

export const checkIsInvalidQuantity = (quantity: number, stock: number) => {
  return (quantity < 1) || (quantity > stock)
};
