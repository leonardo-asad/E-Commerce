# E-Commerce REST API
E-commerce application REST API that allows users to perform various CRUD operations such as registering an account, browsing products for sale, etc.
# Status
The project is deployed at: https://e-commerce-api.fly.dev/api/docs/
# Technologies Used
Node, Express, PostgreSQL, OpenAPI, and Swagger
# Instalation Instruction
1) Clone Repository
2) Create and connect a Local Postgres Database. Create tables using the statements in: "db/e-commerce.sql". Populate "category" table with the values
found in "db/category.sql". Populate "product" table using insert queries found in products.sql 
3) Create a .env file inside your working directory (Use example.env as a reference) and populate it.
4) Run npm install inside directory
5) Run npm start inside the directory. 
6) Open "http://localhost:3000/api" in your web Browser and start using the API. The documentation can be found at "http://localhost:3000/api/docs"
