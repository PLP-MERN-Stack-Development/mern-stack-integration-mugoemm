# MERN Blog

## Project overview
A simple MERN-stack blog application providing user authentication, post creation/editing/deletion, and comments. Backend is an Express API with MongoDB; frontend is a React single-page app.

## Tech stack
- MongoDB (Mongoose)
- Node.js, Express
- React, React Router
- JWT authentication
- Optional: Multer for image uploads

## Prerequisites
- Node.js >= 16
- npm or yarn
- MongoDB instance (local or Atlas)
- Git (to clone)

## Quick setup

1. Clone
    git clone <repo-url> /d:/plp-africa/week4assignment/mern-blog
2. Backend
    cd /d:/plp-africa/week4assignment/mern-blog/server
    cp .env.example .env
    npm install
    npm run dev
3. Frontend
    cd ../client
    npm install
    npm start

Default ports:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Environment variables (example .env)
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mern-blog
JWT_SECRET=your_jwt_secret_here
PORT=5000

## Available scripts
- server: npm run dev (nodemon)
- client: npm start
- build client: npm run build (in /client)

## API documentation
Base URL: http://localhost:5000/api

Auth
- POST /api/auth/register
  - Body: { "name": "string", "email": "string", "password": "string" }
  - Response: { "user": { "id","name","email" }, "token": "jwt" }
- POST /api/auth/login
  - Body: { "email": "string", "password": "string" }
  - Response: { "token": "jwt", "user": { ... } }

Posts
- GET /api/posts
  - Query: page, limit, search, tag
  - Response: { "posts": [...], "total": number }
- GET /api/posts/:id
  - Response: { "post": { ... } }
- POST /api/posts
  - Headers: Authorization: Bearer <token>
  - Body: { "title": "string", "content": "string", "tags": ["t1"], "imageUrl": "string" }
  - Response: { "post": { ... } }
- PUT /api/posts/:id
  - Headers: Authorization: Bearer <token>
  - Body: fields to update
  - Response: { "post": { ... } }
- DELETE /api/posts/:id
  - Headers: Authorization: Bearer <token>
  - Response: { "message": "deleted" }

Comments
- GET /api/posts/:postId/comments
  - Response: { "comments": [...] }
- POST /api/posts/:postId/comments
  - Headers: Authorization: Bearer <token>
  - Body: { "text": "string" }
  - Response: { "comment": { ... } }

Users
- GET /api/users/:id
  - Response: { "user": { "id","name","email", ... } }

Error responses use HTTP status codes and return { "message": "error description" }.

Authentication
- JWT in Authorization header: Authorization: Bearer <token>
- Protected routes require token and typically owner checks for updates/deletes.

Examples (curl)
- Register:
  curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Alice","email":"a@b.com","password":"pass"}'
- Create post:
  curl -X POST http://localhost:5000/api/posts -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title":"Hi","content":"Body"}'

## Features implemented
- User registration & login (JWT)
- Create / read / update / delete posts
- Comment on posts
- Pagination and basic search/filter
- Frontend SPA with React routing
- Image upload support (optional; configure storage)

## Screenshots
Place screenshots in /screenshots and reference them here:
- Home /posts list: ![Home](d:\plp-africa\week4assignment\mern-blog\screenshots\home.PNG)
- Post detail: ![Post](d:\plp-africa\week4assignment\mern-blog\screenshots\post.PNG)
- Create post: ![Create](d:\plp-africa\week4assignment\mern-blog\screenshots\create post.PNG)

## Notes & extension ideas
- Add role-based access (admin)
- Add likes, tags page, rich-text editor
- Add rate-limiting and input validation hardening
- Deploy backend to Heroku/Render and frontend to Vercel/Netlify

## Contributing
- Fork, create feature branch, open PR
- Follow existing code style; run tests (if present)

## License
Specify project license in LICENSE file (e.g., MIT).
