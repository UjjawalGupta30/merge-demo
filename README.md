# Merge Unified API Demo

This project demonstrates how to integrate Merge's Unified API using a secure backend and a React frontend.

## Folder Structure

```
merge/
├── backend/           # Express backend (API proxy)
│   ├── server.js
│   └── package.json
├── public/            # React public assets
├── src/               # React source code
│   ├── api/mergeApi.js
│   └── ...
├── package.json       # React app config
├── package-lock.json
└── README.md          # This file
```

## How it Works

- **Frontend (React):**
  - Calls the backend for all Merge API operations (never exposes API keys).
  - Uses `src/api/mergeApi.js` to interact with the backend.
- **Backend (Express):**
  - Proxies requests to Merge API, securely using your API key.
  - Endpoints:
    - `POST /api/create-link-token` — creates a Merge Link token
    - `GET /api/account-token/:publicToken` — exchanges public_token for account_token
    - `GET /api/accounts` — fetches accounts using account_token

## Setup & Usage

### 1. Install Dependencies

#### Backend
```
cd backend
npm install
```

#### Frontend
```
npm install
```

### 2. Configure API Key
- In `backend/server.js`, set your Merge API key:
  ```js
  const API_KEY = 'YOUR_MERGE_API_KEY';
  ```
- (Optional) Use environment variables for production.

### 3. Run Locally

#### Start Backend
```
cd backend
npm start
```

#### Start Frontend
```
cd ..
npm start
```

- Frontend runs on [http://localhost:3000](http://localhost:3000)
- Backend runs on [http://localhost:4000](http://localhost:4000)

### 4. Deploy
- Host backend (e.g. Render, Heroku, Railway)
- Host frontend (e.g. Vercel, Netlify)
- Update API URLs in `src/api/mergeApi.js` to point to your backend's public URL

## For Frontend Developers
- Use the functions in `src/api/mergeApi.js` to interact with Merge (create link token, exchange token, fetch accounts)
- Never use the Merge API key in frontend code
- All sensitive operations go through the backend

## For Backend Developers
- All Merge API requests are proxied through `backend/server.js`
- Never expose your API key in frontend or public repos
- Add more endpoints as needed for other Merge API features

## .gitignore Example

```
# Node modules
node_modules/

# Build output
build/
dist/

# Logs
*.log

# Env files
.env

# OS/IDE
.DS_Store
.vscode/
```

---

**Questions?**
- See Merge API docs: https://docs.merge.dev/
- Or ask your backend lead for help.
