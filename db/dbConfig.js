require('dotenv').config();

const { Pool } = require('pg');

if (process.env.DATABASE_ENV === "local_development") {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerceapp',
    password: process.env.PASSWORD,
    port: 5432,
  });

  module.exports = {
    pool,
  };

} else {
  const connectionString = process.env.DATABASE_URL

  const pool = new Pool({
    connectionString,
  });

  module.exports = {
    pool,
  };
};
