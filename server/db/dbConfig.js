require('dotenv').config();

const { Pool } = require('pg');

if (process.env.DATABASE_ENV === "local_development") {
  const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
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
    size,
  };
};
