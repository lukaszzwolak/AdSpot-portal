# AdSpot Portal

A full-stack classifieds application built with **MERN stack** and **Redux**.  
Users can browse, search, create, edit, and delete ads after logging in.  

Live demo: 

---

## Features

- **Authentication**
  - Register with login, password, phone, and optional avatar.
  - Login & logout with session cookies.
  - Auth state persisted across refresh.

- **Ads**
  - Home page shows all ads in a responsive grid (title, photo, location, price).
  - Search bar filters ads by phrase (`/search/:phrase`).
  - Detailed ad page shows full info (description, date, seller data).
  - Only the author of an ad can **edit** or **delete** it.
  - Adding and editing ads use form validation (title, content, price, location, photo).
  - Images served from backend (`/uploads/...`).

- **UI**
  - Navigation bar with **Home**, **Sign in/Sign up** (if logged out) or **Add/Sign out** (if logged in).
  - Bootstrap-based responsive layout.
  - Loading spinners and error alerts on API calls.

---

## Tech Stack

- **Frontend**: React, React Router, Redux, Redux Thunk, React Bootstrap
- **Backend**: Node.js, Express, MongoDB (Mongoose), Joi validation
- **Auth**: express-session with MongoStore
- **Other**: Multer for file uploads, CORS, Morgan, dotenv
- **Deployment**: Replit

---

## Development

### Run server
cd server
yarn install
yarn dev

Run client
cd client
yarn install
yarn start
Deployment
Build client with:

cd client
yarn build
Server serves client/build in production.

Configure environment variables on Replit:

PORT, MONGO_URI, SESSION_SECRET, NODE_ENV=production, CLIENT_URL.


