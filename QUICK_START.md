# 🚀 Quick Start Guide

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure the Application

1. Open `server/.env` file
2. Paste your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Save the file

## Step 3: Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
🚀 MediScript AI Server running on port 5000
📍 Health check: http://localhost:5000/health
📍 API endpoint: http://localhost:5000/api
```

## Step 4: Start the Frontend (New Terminal)

```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

## Step 5: Open the Application

Visit `http://localhost:3000` in your browser

## Step 6: Test the Application

1. Upload a prescription image (or use the sample in `test-samples/`)
2. Click "Analyze Prescription"
3. Wait for AI processing (5-10 seconds)
4. View results in English and Hindi
5. Try the voice output feature

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify your Gemini API key is correct
- Check `server/.env` file exists

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in client directory
- Clear browser cache

### "API configuration error"
- Verify Gemini API key in `server/.env`
- Ensure no extra spaces in the API key
- Check API key permissions at Google AI Studio

### No text extracted from image
- Use a clear, well-lit image
- Ensure prescription is in focus
- Try a higher resolution image
- Check if image contains actual text

## Sample Prescription Format

For testing, create a prescription with:
```
Medicine: Paracetamol 500mg
Dosage: 1 tablet
Frequency: BD (Twice daily)
Duration: 5 days
Instructions: After food
```

## Next Steps

- Read the full [README.md](README.md)
- Check [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for architecture details
- Explore the codebase
- Customize the UI/UX
- Add more languages

---

**Need Help?** Check the troubleshooting section in README.md
