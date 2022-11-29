CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password text NOT NULL
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) UNIQUE
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name varchar(40) UNIQUE NOT NULL,
  description text,
  url_image varchar(80),
  quantity integer NOT NULL,
  price decimal NOT NULL,
  date timestamptz,
  active boolean NOT NULL DEFAULT TRUE,
  user_id integer REFERENCES users(id)
);

CREATE TABLE carts_products (
  id SERIAL UNIQUE,
  cart_id integer REFERENCES cart(id),
  product_id integer REFERENCES product(id),
  quantity integer,
  PRIMARY KEY (cart_id, product_id)
);

CREATE TABLE users_orders (
  id SERIAL PRIMARY KEY,
  quantity integer NOT NULL,
  price decimal NOT NULL,
  date timestamptz,
  user_id integer REFERENCES users(id),
  product_id integer REFERENCES product(id)
);

CREATE TABLE category (
  name varchar(40) PRIMARY KEY
);

CREATE TABLE products_categories (
   product_name varchar(40) REFERENCES product(name),
   category_name varchar(20) REFERENCES category(name),
   PRIMARY KEY (product_name, category_name)
);
