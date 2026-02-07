---
description: Start MediScript AI Application
---

# Start MediScript AI

This workflow starts both the backend server and frontend application.

## Prerequisites

1. Ensure you have your Gemini API key configured in `server/.env`
2. Dependencies are installed (run `npm install` in both `server/` and `client/` if not done)

## Steps

### 1. Start Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```

**Expected Output:**
```
🚀 MediScript AI Server running on port 5000
📍 Health check: http://localhost:5000/health
📍 API endpoint: http://localhost:5000/api
```

### 2. Start Frontend Application

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 3. Open Application

Visit `http://localhost:3000` in your browser

### 4. Test the Application

1. Upload the sample prescription from `test-samples/sample_prescription.png`
2. Click "Analyze Prescription"
3. Wait for results
4. Try switching between English and Hindi
5. Test the voice output feature

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
```

**API Key Error:**
- Check `server/.env` file exists
- Verify `GEMINI_API_KEY` is set correctly
- No extra spaces or quotes around the key

### Frontend Issues

**Port 3000 already in use:**
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

**Dependencies missing:**
```bash
cd client
npm install
```

### Both Services

**Quick restart:**
1. Stop both servers (Ctrl+C in each terminal)
2. Wait 2 seconds
3. Start backend first, then frontend

## Quick Commands

**Stop all services:**
- Press `Ctrl+C` in each terminal

**Check if services are running:**
```bash
# Check backend
curl http://localhost:5000/health

# Check frontend
curl http://localhost:3000
```

**View logs:**
- Backend logs appear in the server terminal
- Frontend logs appear in the client terminal
- Browser console (F12) for frontend errors

---

**Ready to go!** 🚀
