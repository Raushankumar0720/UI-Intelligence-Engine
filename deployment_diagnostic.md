# 🛠️ Dashboard Diagnostic Guide: Auth Fix

> **Project STELLAR.** This guide helps you identify and fix the communication gap between your Vercel frontend and Render backend in 60 seconds.

---

## 🔍 Step 1: The Browser Audit
Open your live site and press **F12** (or Right-Click -> Inspect) and go to the **Console** tab. Try to log in. 

### Case A: "Access to fetch at ... has been blocked by CORS policy"
**The problem**: Your Render server doesn't recognize your Vercel URL.
1.  Go to your **Render Dashboard** -> **Environment Variables**.
2.  Find `FRONTEND_URL`.
3.  Ensure it is exactly: `https://ui-intelligence-engine-nu.vercel.app` (No trailing slash).
4.  **Save** and wait for the "Applying" status to finish.

### Case B: "POST ... 404 (Not Found)"
**The problem**: The frontend is hitting the wrong address.
1.  Go to your **Vercel Dashboard** -> **Settings** -> **Environment Variables**.
2.  Find `VITE_API_URL`.
3.  Ensure it points to your Render API (e.g., `https://ui-engine.onrender.com/api`).
4.  **Important**: Don't forget the `/api` at the end!

---

## 🚀 Resilient Fixes Applied
We have pushed a **"Self-Correction"** update to the codebase that handles the following automatically:

- [x] **Auto-API Path**: If you miss the `/api` in Vercel, the code will now append it for you.
- [x] **Flexible CORS**: The server now accepts your Vercel URL whether you put a slash at the end or not.
- [x] **Debug Logs**: If something is still wrong, the **Render Logs** will now tell you exactly which origin is being blocked.

---

## 📌 Final Action
After verifying your Dashboard settings, **Redeploy on Vercel** to ensure the new "Resilient" code is active. 

1. Go to Vercel -> **Deployments**.
2. Click the three dots (**...**) on the latest deployment.
3. Select **Redeploy**.

*© 2026 UI Intelligence Engine Industries. Built for the elite engineering age.*
