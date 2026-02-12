# Quick Start Guide

Get Tasks Generator running in under 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Groq API key ([Get free at console.groq.com](https://console.groq.com))

## Step 1: Get the Code

```bash
git clone <your-repo-url>
cd "Tasks Generator"
npm install
```

## Step 2: Configure Backend

```bash
cd backend
cp .env.example .env.local
```

Edit `backend/.env.local`:
```bash
GROQ_API_KEY=your_actual_groq_api_key_here
```

## Step 3: Configure Frontend

```bash
cd ../frontend
cp .env.example .env.local
```

For local development, leave `VITE_API_URL` empty in `frontend/.env.local`:
```bash
VITE_API_URL=
```

## Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Open App

Visit: **http://localhost:5173**

## Usage

1. Enter your project goal (e.g., "Build a todo app")
2. Specify users (e.g., "Students")
3. Add constraints (e.g., "Simple UI")
4. Click "Generate Tasks"
5. View, edit, and export your AI-generated tasks!

## Need Help?

- **Backend not starting?** Check your Groq API key in `backend/.env.local`
- **Frontend can't connect?** Make sure backend is running on port 3000
- **API errors?** Verify your Groq API key is valid at [console.groq.com](https://console.groq.com)

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed configuration
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [README.md](README.md) for full documentation
