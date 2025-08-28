# OnSale (Full Stack)

A full-stack e-commerce application. Backend: Express + MongoDB (with Stripe, Cloudinary, and Redis). Frontend: Vite + React with Zustand, React Router, and an initial-load preloader.

## Monorepo Structure
```
.
  backend/          # Express API, MongoDB, Stripe, Cloudinary, Redis
  frontend/         # React + Vite client
  package.json      # Root scripts (dev, start, build)
```

## Features
- User auth with HTTP-only cookies (access/refresh tokens)
- Product catalog, categories, featured and recommended products
- Shopping cart and coupon support
- Stripe checkout and order persistence
- Admin endpoints for product management
- Global toasts and loading states; preloader for first paint

## Tech Stack
- Backend: Node.js, Express, Mongoose, JSON Web Tokens, Stripe SDK, Cloudinary, Upstash Redis, Zod
- Frontend: React 18, Vite, React Router v6, Zustand, Axios

## Environment Variables
Create a .env file for the backend. Required variables:

Backend (required)
- PORT: API server port (e.g., 5000)
- MOGO_URI: MongoDB connection string
- ACCESS_TOKEN_SECRET: JWT secret for access tokens
- REFRESH_TOKEN_SECRET: JWT secret for refresh tokens
- STRIPE_SECRET_KEY: Stripe secret key
- CLIENT_URL: Public URL of the frontend (e.g., http://localhost:5173)
- UPSTASH_REDIS_REST_URL: Upstash Redis REST URL
- UPSTASH_REDIS_REST_TOKEN: Upstash Redis REST token
- CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_SECRET_KEY: Cloudinary API secret

Frontend (optional)
- VITE_API_BASE_URL: Override API base URL used by Axios. Defaults to http://localhost:5000/api in dev and /api in prod.

CORS and cookies
- Backend uses cookies; ensure CORS allows the frontend origin and credentials: true. Use secure cookies in production (HTTPS).

## Installation and Setup
Prerequisites: Node.js 18+

1) Install dependencies
```bash
# from repository root
npm install
npm install --prefix frontend
```

2) Configure environment
- Create .env with the variables above.

3) Development
```bash
# starts backend with nodemon and serves API on PORT
npm run dev

# in another terminal, start the frontend dev server
cd frontend && npm run dev
```
Frontend runs at http://localhost:5173. Backend listens on PORT (e.g., http://localhost:5000).

4) Production build
```bash
# builds the frontend (into frontend/dist)
npm run build

# start the server (serves API and static frontend in production mode)
npm start
```

## Key Backend Endpoints
Base path: /api

- Auth: /api/auth/signup, /api/auth/login, /api/auth/logout, /api/auth/refresh-token, /api/auth/profile
- Products: /api/products (admin), /api/products/featured, /api/products/category/:category, /api/products/recommendations, POST/PATCH/DELETE /api/products (admin)
- Cart: GET/POST/DELETE /api/cart, PUT /api/cart/:id
- Coupons: GET /api/coupons, POST /api/coupons/validate
- Payments: POST /api/payments/create-checkout-session, POST /api/payments/checkout-success

Protected endpoints require a valid access token cookie. Admin routes additionally require admin role.

## Frontend Notes
- Axios instance: frontend/src/lib/axios.js (uses withCredentials)
- Preloader: inline in frontend/index.html, removed in frontend/src/main.jsx
- State: Zustand stores for user, cart, and products

## License
MIT
