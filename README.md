# E-Commerce
This is a sample application that demostrates an E-Commerce website using the PERN stack (PostgreSQL, Express.js, React.js, Node.js)

# Features
:heavy_check_mark: Browse Products

:heavy_check_mark: See product details

:heavy_check_mark: Register

:heavy_check_mark: Login with username and password

:heavy_check_mark: Loging Using your Google Account with OAuth 2.0.

:heavy_check_mark: Logout

:heavy_check_mark: Add products to your Cart

:heavy_check_mark: Remove products from your Cart

:heavy_check_mark: Edit products in Cart

:heavy_check_mark: Test Checkout process with Stripe (Credit Card Numbers for testing are provided)

:heavy_check_mark: See your Previous Orders

# Demo on Render
![Screenshot from 2023-01-09 17-01-55](https://user-images.githubusercontent.com/64209661/211239213-d6fa9399-9d94-4b8c-9d34-fc5be6755f4e.png)

**Visit the deployed website with this [link](https://e-commerce-demo-yxsr.onrender.com/)**
# Stack
![E-Commerce Stack](https://user-images.githubusercontent.com/64209661/207155008-f7c94a2b-c4b5-4359-95b1-dc38d53ec840.png)
# Run locally
To run the application you need to install separately the backend and the frontend apps (server and client folders respectively).
1. Download a copy of this repository on your local drive running this commands on your terminal:
```
mkdir <name of the app>
cd <name of the app>
git clone git@github.com:leonardo-asad/E-Commerce.git
```
2.1. Install Backend application dependencies:
```
cd E-Commerce/server
npm install
```
2.2. Create a .env file inside the server folder with the following variables.

2.2.1. This app uses OAuth 2.0 to authenticate Users with their Google account. Once you've registered your application, the strategy needs to be configured with your application's client ID and secret, along with its OAuth 2.0 redirect endpoint.
Read the documentation [here](https://www.passportjs.org/packages/passport-google-oauth2/)

```
GOOGLE_CLIENT_ID="id"
GOOGLE_CLIENT_SECRET="secret"
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:3000/api"
```
2.2.2. Connect to PostgreSQL Database: Create a database and use the sentences in db/e-commerce.sql and db/products.sql to create the tables and populate them with values. Finally create the following variables inside .env file as following (Use your own values):
```
# Database Server Configuration
DATABASE_ENV="local_development"
DATABASE_USER="user"
DATABASE_HOST="localhost"
DATABASE_NAME="database_name"
DATABASE_PASSWORD="database_password"
DATABASE_PORT=5432
```
2.2.3. Session Configuration: This is used to Sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets. 
```
SECRET="your_own_secret"
```
2.2.4. Stripe Secret Key: This app uses Stripe to handle the Checkout flow. Stripe authenticates your API requests using your account’s API keys.
Create an account and get your API keys [here](https://dashboard.stripe.com/register)
```
STRIPE_SECRET_KEY="secret_key"
```

3.1. Install Frontend application dependencies:
```
cd E-Commerce/client
npm install
```
3.2. Create a .env file inside the client folder with the following variables.

3.2.1. Axios Base URL config:
```
REACT_APP_API_URL="/api"
```
3.2.2. Stripe Publishable API Key
```
REACT_APP_STRIPE="your_own_publishable_key"
```
4. Run server app (port 3000)
```
npm run start
```
5. Run React app (port 3001)
```
npm run start
```
6. Go to http://localhost:3001 on your browser and start using the app.
