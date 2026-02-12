# Tasks Generator

> AI-powered task breakdown tool that transforms project ideas into actionable user stories and engineering tasks.

## 🎯 Overview

Tasks Generator is a full-stack web application that uses AI to automatically generate structured task breakdowns from simple project descriptions. Perfect for project planning, sprint preparation, and requirement analysis.

**Live Demo:** [Coming Soon on Vercel]

## ✨ Key Features

- **AI-Powered Generation**: Uses Groq's Llama 3.3 70B model for intelligent task creation
- **Smart Templates**: Pre-built templates for Web Apps, Mobile Apps, and Internal Tools
- **Interactive Task Management**: 
  - ✏️ Edit tasks inline
  - 🗑️ Delete unwanted tasks
  - 🔄 Drag-and-drop reordering
  - 📦 Collapsible task groups
- **Export Options**: Download as Markdown or plain text, copy to clipboard
- **History Management**: Automatically saves your last 5 task generations
- **Modern UI**: Clean, responsive interface with smooth animations

## 🛠️ Technology Stack

### Backend
- **Next.js 16** (App Router with Turbopack)
- **TypeScript 5** (Strict mode)
- **Groq API** (llama-3.3-70b-versatile model)
- **File-based Storage** (JSON persistence)

### Frontend
- **React 18** with Hooks
- **Vite 7** for fast development
- **HTML5 Drag and Drop API**
- **Modern CSS3** with responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Groq API key ([Get free key here](https://console.groq.com))

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd "Tasks Generator"

# Install dependencies for both frontend and backend
npm install

# Configure environment
cd backend
cp .env.example .env.local
# Edit .env.local and add your Groq API key

cd ../frontend
cp .env.example .env.local
# For local development, leave VITE_API_URL empty

# Start development servers
cd ../backend
npm run dev &

cd ../frontend
npm run dev
```

Visit http://localhost:5173 to use the app!

## 📋 How to Use

1. **Enter Project Details**
   - Describe your goal (e.g., "Build a todo app")
   - Specify target users (e.g., "Students")
   - Add any constraints (e.g., "Simple UI, mobile-first")

2. **Choose a Template** (Optional)
   - Web Application
   - Mobile Application  
   - Internal Tool

3. **Generate Tasks**
   - Click "Generate Tasks" button
   - AI creates user stories and engineering tasks
   - Tasks appear organized in collapsible sections

4. **Manage Tasks**
   - Edit: Click pencil icon to modify any task
   - Delete: Click trash icon to remove tasks
   - Reorder: Drag and drop tasks to reorganize

5. **Export**
   - Choose Markdown or Text format
   - Copy to clipboard or download as file

6. **View History**
   - Access last 5 generations
   - Click "Load" to restore previous tasks

## 🔧 Configuration

### Environment Variables

**Backend (.env.local)**
```bash
GROQ_API_KEY=your_groq_api_key_here
```

**Frontend (.env.local)**
```bash
# Local development (uses Vite proxy)
VITE_API_URL=

# Production deployment
VITE_API_URL=https://your-backend-url.vercel.app
```

### Getting Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for free account
3. Navigate to API Keys section
4. Create new API key
5. Copy and paste into backend/.env.local

## 📁 Project Structure

```
Tasks Generator/
├── backend/                  # Next.js API backend
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-tasks/   # POST - Generate tasks with AI
│   │   │   └── specs/            # GET - Fetch history
│   │   └── layout.tsx
│   ├── lib/
│   │   └── specs.ts          # Data persistence functions
│   ├── data/
│   │   └── specs.json        # Task history storage
│   └── .env.local            # API keys (not in git)
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx        # Input form
│   │   │   ├── TaskList.jsx        # Task display & management
│   │   │   ├── TaskCard.jsx        # Individual task component
│   │   │   ├── ExportOptions.jsx   # Export functionality
│   │   │   └── SpecHistory.jsx     # History viewer
│   │   ├── App.jsx           # Main application
│   │   └── main.jsx
│   └── .env.local            # API URL (not in git)
│
├── .env.example              # Template files (in git)
└── README.md                 # This file
```

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `backend` folder as root directory
   - Add environment variable: `GROQ_API_KEY`
   - Deploy

3. **Deploy Frontend**
   - Import same repository again
   - Select `frontend` folder as root directory
   - Add environment variable: `VITE_API_URL` (your backend URL)
   - Deploy

### Environment Variables for Production

**Backend:**
- `GROQ_API_KEY`: Your Groq API key

**Frontend:**
- `VITE_API_URL`: Your backend deployment URL

## 🔒 Security Notes

- ✅ API keys stored in `.env.local` files (gitignored)
- ✅ `.env.example` files provided as templates
- ✅ No sensitive data in source code
- ✅ CORS configured for production
- ⚠️ Never commit `.env.local` files to git

## 📡 API Endpoints

### POST /api/generate-tasks
Generate tasks using AI.

**Request:**
```json
{
  "goal": "Build a todo app",
  "users": "Students",
  "constraints": "Simple UI"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "createdAt": "2024-02-12T10:00:00.000Z",
  "goal": "Build a todo app",
  "users": "Students",
  "constraints": "Simple UI",
  "tasks": {
    "userStories": [
      {
        "title": "User Can Create Todos",
        "description": "As a student, I want to..."
      }
    ],
    "engineeringTasks": [
      {
        "title": "Design Database Schema",
        "description": "Create database tables..."
      }
    ]
  }
}
```

### GET /api/specs
Get list of last 5 task generations (history).

### GET /api/specs/:id
Get full details of a specific task generation.

## 🧪 Testing

```bash
# Test backend API
curl -X POST http://localhost:3000/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{"goal":"Build a todo app","users":"Students","constraints":"Simple UI"}'

# Test frontend
open http://localhost:5173
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Troubleshooting

**Issue: "API key not found" error**
- Solution: Check that `GROQ_API_KEY` is set in `backend/.env.local`
- Make sure there's a newline at the end of the file

**Issue: Frontend can't connect to backend**
- Solution: Check both servers are running
- Backend should be on port 3000, frontend on port 5173
- For production, set `VITE_API_URL` in frontend environment

**Issue: Tasks not generating**
- Check Groq API key is valid
- Check backend terminal for error messages
- Verify internet connection

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in `/docs` folder

---

Built with ❤️ using Next.js, React, and Groq AI
