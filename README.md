# Ritik Jain — Personal Portfolio

A full-stack personal portfolio website built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## Project Structure
```
My_Personal_Portfolio-main/
├── frontend/         ← React/Vite app (deploy to Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
└── backend/          ← Node.js/Express API (deploy to Render)
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## Local Development

### 1. Start the Backend
```bash
cd backend
npm install
npm start        # runs on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev      # runs on http://localhost:8080
```

## Deployment

| Service | Provider | Root Dir |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | `frontend` |
| Backend | [Render](https://render.com) | `backend` |

### Environment Variables

**Frontend (Vercel):**
```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

**Backend (Render):**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=https://your-portfolio.vercel.app
PORT=5000
```
