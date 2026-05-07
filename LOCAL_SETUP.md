# BrickByte Local Setup

Use these steps to run the site manually on a local machine, without Codex.

## 1. Requirements

- Node.js 18 or newer
- npm
- MongoDB Community Server or Docker Desktop

## 2. Start MongoDB

Choose one option.

### Option A: Docker

```powershell
cd backend
docker compose up -d mongo
npm run db:check
```

### Option B: Local MongoDB Install

Create a database folder once:

```powershell
mkdir data\db
```

Start MongoDB:

```powershell
mongod --dbpath .\data\db
```

In a second terminal:

```powershell
cd backend
npm run db:check
```

## 3. Backend

```powershell
cd backend
npm install
copy .env.example .env.local
```

For local MongoDB, keep this in `backend/.env.local`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/brickbyte
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Start the API:

```powershell
npm start
```

Check readiness:

```powershell
curl http://localhost:4000/health/ready
```

The database is connected when the response includes:

```json
"database": {
  "status": "healthy"
}
```

## 4. Frontend

```powershell
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Open:

```text
http://localhost:5173
```

If port `5173` is busy, Vite will print the next available URL, for example `http://localhost:5174`.

## 5. Admin

```powershell
cd admin
npm install
copy .env.example .env.local
npm run dev -- --host 0.0.0.0 --port 5174
```

Open:

```text
http://localhost:5174
```
