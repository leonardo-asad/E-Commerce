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
