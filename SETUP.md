# Tasks Generator - Setup Instructions

## 📋 Project Overview

**Tasks Generator** is a full-stack application that helps product managers and engineers generate comprehensive task breakdowns from feature ideas using AI (Claude).

### What It Does
1. ✍️ You describe a feature idea (goal, users, constraints)
2. 🤖 AI generates user stories and engineering tasks
3. ✏️ You can edit, reorder, and group tasks
4. 📤 Export results as markdown or text
5. 💾 View last 5 generated specifications

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + Vite (TypeScript ready)
- **Backend**: Next.js 15 + TypeScript
- **AI**: Claude API via Anthropic
- **Storage**: File-based JSON (easily replaceable with DB)
- **Styling**: Modern CSS3

### File Structure
```
tasks-generator/
├── backend/                    # Next.js API server
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── generate-tasks/route.ts   # POST /api/generate-tasks
│   │   │   │   └── specs/
│   │   │   │       ├── route.ts              # GET /api/specs
│   │   │   │       └── [id]/route.ts         # GET /api/specs/:id
│   │   │   └── ...
│   │   └── lib/
│   │       └── specs.ts                      # Data persistence
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx       # Input form with templates
│   │   │   ├── TaskList.jsx       # Draggable task lists
│   │   │   ├── TaskCard.jsx       # Individual task
│   │   │   ├── ExportOptions.jsx  # Export functionality
│   │   │   └── SpecHistory.jsx    # View past specs
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── ...
│
├── package.json               # Root workspace config
├── README.md                  # Project overview
├── DEPLOYMENT.md              # Deployment guide
└── .gitignore
```

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js 18+** (check with `node --version`)
- **npm or yarn**
- **Claude API Key** from [console.anthropic.com](https://console.anthropic.com)

### Step 1: Backend Setup

```bash
cd backend

# Copy environment template
cp .env.example .env.local

# Edit .env.local and add your API key
# CLAUDE_API_KEY=sk-ant-v1-xxxxxxxxxxxxx

# Install dependencies
npm install
```

### Step 2: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

### Step 3: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Output: Server running on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: App running on http://localhost:5173
```

### Step 4: Open App
Visit: **http://localhost:5173**

---

## 🎯 How to Use

### 1. Generate Tasks
1. Fill in the three fields:
   - **Feature Goal**: What should this feature accomplish?
   - **Target Users**: Who will use it and what do they need?
   - **Constraints**: Timeline, tech requirements, performance goals, etc.

2. **Optional**: Select a template (Web App, Mobile App, Internal Tool)

3. Click **"Generate Tasks"** button

4. Wait 2-10 seconds for AI to generate tasks

### 2. Manage Tasks
- **Edit**: Click "Edit" on any task to modify title/description
- **Delete**: Click "Delete" to remove a task
- **Reorder**: Drag tasks within a group to change order
- **Add Custom**: Click "+ Add Task" to manually add tasks

### 3. Export Results
1. Go to **"Export"** tab
2. Choose format:
   - **Markdown**: Great for GitHub, Notion, documentation
   - **Text**: Plain text format for emails, docs
3. **Copy** to clipboard or **Download** as file

### 4. View History
- Click **"History"** tab to see last 5 specifications
- Click **"Load This Spec"** to restore previous work

---

## 🔌 API Endpoints

### POST /api/generate-tasks
Generate user stories and engineering tasks.

```bash
curl -X POST http://localhost:3000/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Build a real-time chat application",
    "users": "Remote teams, any age group",
    "constraints": "End-to-end encryption, mobile-friendly, < 500ms latency"
  }'
```

**Response:**
```json
{
  "id": "1707707200000",
  "createdAt": "2024-02-12T10:30:00Z",
  "goal": "...",
  "users": "...",
  "constraints": "...",
  "tasks": {
    "userStories": [
      { "title": "...", "description": "..." }
    ],
    "engineeringTasks": [
      { "title": "...", "description": "..." }
    ]
  }
}
```

### GET /api/specs
Get list of last 5 specifications.

```bash
curl http://localhost:3000/api/specs
```

### GET /api/specs/:id
Get full details of a specific specification.

```bash
curl http://localhost:3000/api/specs/1707707200000
```

---

## 🔑 Environment Variables

### Backend (.env.local)
```env
# Required: Your Claude API key
CLAUDE_API_KEY=sk-ant-v1-xxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Next.js config
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
# Optional: API URL (defaults to http://localhost:3000)
VITE_API_URL=http://localhost:3000
```

---

## 📝 Code Structure

### Backend - Generate Tasks Flow

1. **Request arrives** at POST `/api/generate-tasks`
2. **Validation**: Check all required fields present
3. **Prompt creation**: Build detailed prompt for Claude
4. **API call**: Send to Claude API with full context
5. **Parsing**: Extract JSON from response
6. **Persistence**: Save to `data/specs.json`
7. **Response**: Return generated tasks + spec ID

### Frontend - Component Flow

```
App.jsx (Main state)
  ├── TaskForm.jsx (Get user input)
  ├── TaskList.jsx (Display + edit tasks)
  │   └── TaskCard.jsx (Individual task)
  ├── ExportOptions.jsx (Export functionality)
  └── SpecHistory.jsx (View past specs)
```

### Key Features

#### Drag and Drop
- Uses HTML5 drag/drop API
- Works within same group (User Stories ↔ User Stories)
- Order persists until refresh

#### Local Persistence
- Frontend: React state (lost on refresh)
- Backend: `backend/data/specs.json` (persistent)
- Only last 5 specs kept to save space

#### Export
- Generates markdown with structure
- Generates plain text format
- Copy to clipboard or download file

---

## 🛠️ Development

### Install Dependencies
```bash
# At root level (uses workspaces)
npm install

# Or individually
cd backend && npm install
cd ../frontend && npm install
```

### Build for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd ../frontend
npm run build
```

### Run Production Build
```bash
# Backend (after building)
cd backend
npm start

# Frontend
cd ../frontend
npm run preview
```

### Linting
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear cache
rm -rf backend/.next

# Reinstall
rm -rf backend/node_modules
npm install -C backend

# Try again
npm run dev -w backend
```

### "Cannot find module" errors
```bash
# Reinstall all dependencies
rm -rf node_modules backend/node_modules frontend/node_modules
npm install
```

### API calls failing
- Check backend is running on port 3000
- Check frontend has correct API URL
- Look at browser console for errors
- Check backend console for error logs

### CORS errors
- Verify vite.config.js has proxy setup
- Ensure both servers are running
- Check API URL is correct

### Tasks not saving
- Verify `backend/data/` directory exists
- Check write permissions
- View backend console for error messages

---

## ✅ Testing

### Manual Testing Checklist
- [ ] Backend starts without errors
- [ ] Frontend connects and loads
- [ ] Can enter form data
- [ ] Task generation works
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Can reorder tasks
- [ ] Export to markdown works
- [ ] Export to text works
- [ ] History shows previous specs
- [ ] Can load previous specs
- [ ] App responsive on mobile

### Example Test Case
```
1. Enter:
   - Goal: "Build a real-time chat app"
   - Users: "Team collaboration"
   - Constraints: "End-to-end encrypted, mobile-first"

2. Click Generate

3. Verify:
   - User stories appear (e.g., "As a user...")
   - Engineering tasks appear (e.g., "Implement WebSocket...")

4. Edit a task title

5. Delete one task

6. Drag to reorder

7. Export as markdown

8. Check History tab

9. Load previous spec
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

**Backend:**
```bash
cd backend
vercel deploy
# Set CLAUDE_API_KEY environment variable
```

**Frontend:**
```bash
cd frontend
vercel deploy
# Set VITE_API_URL=https://your-backend.vercel.app
```

---

## 📚 Learning Resources

- [Claude API Docs](https://docs.anthropic.com/)
- [Next.js Guide](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)

---

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 🎉 You're Ready!

You now have a fully functional AI-powered task generator. Start creating specs and generating tasks!

**Questions?** Check the troubleshooting section or review the API endpoints.
