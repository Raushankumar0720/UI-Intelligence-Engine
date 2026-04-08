# 🚀 Master Deployment Guide: UI Intelligence Engine

> **Project STELLAR.** This guide explains how to deploy the UI Intelligence Engine to a global production environment using **Render** (Backend) and **Vercel** (Frontend).

---

## 🛰️ Architecture Overview
- **Backend**: Node.js / Express (Hosted on Render)
- **Frontend**: React 19 / Vite (Hosted on Vercel)
- **Database**: Local JSON persistence (Migratable to PostgreSQL)

---

## 📦 Stage 1: Deploy the Backend (Render)

1.  **Connect Repo**: Log in to [Render](https://render.com/) and create a new **Web Service**. Connect your GitHub repository.
2.  **Build Settings**:
    - **Root Directory**: `server`
    - **Build Command**: `npm install`
    - **Start Command**: `node index.js`
3.  **Environment Variables**:
    - `PORT`: `5000` (or leave default)
    - `JWT_SECRET`: `[Your Long Random Secret Key]`
    - `FRONTEND_URL`: `https://your-app-name.vercel.app` (You can update this after Stage 2)
4.  **Copy URL**: Once deployed, copy your Render service URL (e.g., `https://ui-engine-api.onrender.com`).

---

## 🎨 Stage 2: Deploy the Frontend (Vercel)

1.  **Connect Repo**: Log in to [Vercel](https://vercel.com/) and import your GitHub repository.
2.  **Framework Preset**: Select **Vite**.
3.  **Environment Variables**:
    - `VITE_API_URL`: `https://ui-engine-api.onrender.com/api` (Paste your Render URL here)
4.  **Deploy**: Hit "Deploy". Vercel will build and go live instantly.

---

## 🛠️ Stage 3: Post-Launch Sync

1.  **CORS Update**: Go back to your **Render** dashboard.
2.  **Update `FRONTEND_URL`**: Set it to the actual Vercel URL you just received (e.g., `https://ui-intelligence-engine.vercel.app`).
3.  **Restart**: Restart the Render service to apply the security lock.

---

## 🔒 Security Hardening Check
- [x] `.env` files are NOT in GitHub (Verified by `.gitignore`).
- [x] `JWT_SECRET` is strong and unique.
- [x] `FRONTEND_URL` on backend matches Vercel URL.
- [x] `VITE_API_URL` on frontend points to the `/api` route of the backend.

---

### 🆘 Troubleshooting
- **CORS Errors**: Ensure the `FRONTEND_URL` on Render exactly matches your Vercel URL (including `https://` but no trailing slash).
- **History Not Saving**: Ensure the Backend service has "Disk Persistence" enabled on Render if you are using the JSON-file storage milestone.

*© 2026 UI Intelligence Engine. Built for the elite engineering age.*
