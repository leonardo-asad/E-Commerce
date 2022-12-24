CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20) NOT NULL,
  password text
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) UNIQUE
);

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  description text,
  url_image text,
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
   product_name varchar(20) REFERENCES product(name),
   category_name varchar(40) REFERENCES category(name),
   PRIMARY KEY (product_name, category_name)
);

CREATE TABLE IF NOT EXISTS federated_credentials (
    user_id INTEGER NOT NULL,
    provider TEXT NOT NULL,
    subject TEXT NOT NULL,
    PRIMARY KEY (provider, subject));


CREATE OR REPLACE FUNCTION create_cart() RETURNS TRIGGER AS
$BODY$
BEGIN
    INSERT INTO cart(user_id)
    VALUES (new.id);

    RETURN new;
END;
$BODY$
language plpgsql;

CREATE TRIGGER trigger_create_cart
     AFTER INSERT ON users
     FOR EACH ROW
     EXECUTE PROCEDURE create_cart();
