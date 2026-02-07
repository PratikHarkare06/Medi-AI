# 💊 MediScript AI 

![MediScript Banner](https://img.shields.io/badge/Status-Production%20Ready-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![Version](https://img.shields.io/badge/Version-1.0.0-purple)

**AI-Powered Prescription Scanner & Medicine Translator**

MediScript AI uses advanced Google Gemini Vision technology to decipher handwritten doctor prescriptions and translate them into clear, easy-to-understand instructions in your preferred language (English/Hindi).

![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react&logoColor=white) 
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) 
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) 
![Google Gemini](https://img.shields.io/badge/-Google_Gemini-8E75B2?logo=google&logoColor=white)

---

## 🎯 Key Features

- 📸 **Smart Scanning**: Upload or drag-and-drop prescription images.
- 🧠 **AI Handwriting Recognition**: Powered by **Google Gemini 1.5/2.0 Flash** for high accuracy.
- 💊 **Medicine Extraction**: Automatically identifies medicine names, dosages, and frequencies.
- 🗣️ **Voice Assistance**: Reads out instructions for elderly or visually impaired users.
- 🌐 **Multi-Language Support**: Instantly translates instructions between English and Hindi.
- 🎨 **Modern UI**: Glassmorphism design with Dark Mode support.
- 🔒 **Privacy Focused**: No permanent storage of your medical data.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **Git**
- A **Google Gemini API Key** (Get it for free [here](https://aistudio.google.com/app/apikey))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PratikHarkare06/Medi-AI.git
cd Medi-AI
```

### 2️⃣ Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

**Configure Environment:**
Create a `.env` file in the `server` directory:
```bash
# In server/.env
PORT=5001
GEMINI_API_KEY=your_actual_api_key_here
```

start the backend:
```bash
npm run dev
# Server runs on http://localhost:5001
```

### 3️⃣ Frontend Setup
Open a new terminal, navigate to the client folder:
```bash
cd ../client
npm install
```

Start the frontend:
```bash
npm run dev
# App opens at http://localhost:3005
```

---

## 📁 Project Structure

```bash
Medi-AI/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # resuable UI components
│   │   └── services/    # API handling
│   └── public/          # Static assets
├── server/              # Node.js Express Backend
│   ├── routes/          # API routes
│   ├── services/        # AI & OCR integration logic
│   └── uploads/         # Temporary file storage
└── README.md            # This file
```

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, CSS Modules (Glassmorphism).
- **Backend**: Node.js, Express.js, Multer.
- **AI Engine**: Google Generative AI SDK (`@google/generative-ai`).
- **Image Processing**: Sharp.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Made with ❤️ by Pratik Harkare**
