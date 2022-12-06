export interface UserCredentials {
  username: string,
  password: string
}

export interface NewUserForm {
  username: string,
  password: string,
}

export interface Product {
  id: number,
  name: string,
  description: string,
  url_image: string,
  quantity: number,
  price: string,
  date: string,
  active: boolean,
  user_id: number
}

export type Products = Product[]

export interface RequestBodyAddToCart {
  productId: number,
  quantity: number
}

export interface RequestBodyUpdateCartItem {
  quantity: number
}

export interface CartProduct {
  id: number,
  product_id: number,
  name: string,
  url_image: string,
  in_stock: number,
  quantity_order: number,
  price: string,
  total_price: string
};

export type CartProducts = CartProduct[];
