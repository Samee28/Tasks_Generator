# Tasks Generator - Setup & Deployment Guide

## 🚀 Quick Start

### Local Development

**Requirements:**
- Node.js 18+
- Claude API Key

**Step 1: Clone and Setup Backend**
```bash
cd backend
cp .env.example .env.local
# Add your CLAUDE_API_KEY to .env.local
npm install
```

**Step 2: Setup Frontend**
```bash
cd frontend
npm install
```

**Step 3: Run Both**

Terminal 1:
```bash
cd backend
npm run dev  # Runs on http://localhost:3000
```

Terminal 2:
```bash
cd frontend
npm run dev  # Runs on http://localhost:5173
```

Open browser: http://localhost:5173

---

## 📦 Project Architecture

### Backend (Next.js)
- **Framework:** Next.js 15 with TypeScript
- **API Route:** `/api/generate-tasks` - POST endpoint for AI task generation
- **API Routes:** `/api/specs` - GET endpoints for spec history
- **Persistence:** File-based JSON storage in `data/specs.json`
- **Dependencies:** axios, dotenv

### Frontend (React)
- **Framework:** React 18
- **Build Tool:** Vite
- **Components:**
  - `TaskForm` - Input form with templates
  - `TaskList` - Editable, draggable task lists
  - `TaskCard` - Individual task cards
  - `ExportOptions` - Export to markdown/text
  - `SpecHistory` - View and load previous specs

---

## 🔧 API Reference

### POST /api/generate-tasks
Generates user stories and engineering tasks from a feature specification.

**Request Body:**
```json
{
  "goal": "Build a mobile shopping app",
  "users": "Online shoppers aged 18-45",
  "constraints": "iOS & Android, offline support, < 5MB"
}
```

**Response:**
```json
{
  "id": "1707707200000",
  "createdAt": "2024-02-12T10:30:00Z",
  "goal": "Build a mobile shopping app",
  "users": "Online shoppers aged 18-45",
  "constraints": "iOS & Android, offline support, < 5MB",
  "tasks": {
    "userStories": [
      {
        "title": "User Story Title",
        "description": "Description of what the user can do"
      }
    ],
    "engineeringTasks": [
      {
        "title": "Engineering Task Title",
        "description": "Technical implementation details"
      }
    ]
  }
}
```

### GET /api/specs
Returns a summary of the last 5 generated specifications.

**Response:**
```json
[
  {
    "id": "1707707200000",
    "createdAt": "2024-02-12T10:30:00Z",
    "goal": "Build a mobile shopping app",
    "users": "Online shoppers aged 18-45",
    "constraints": "iOS & Android, offline support, < 5MB"
  }
]
```

### GET /api/specs/:id
Returns the full specification including tasks.

**Response:**
```json
{
  "id": "1707707200000",
  "createdAt": "2024-02-12T10:30:00Z",
  "goal": "Build a mobile shopping app",
  "users": "Online shoppers aged 18-45",
  "constraints": "iOS & Android, offline support, < 5MB",
  "tasks": { ... }
}
```

---

## 🌐 Deployment Guide

### Option 1: Deploy on Vercel (Recommended)

**Backend (Next.js):**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select the backend folder
4. Add environment variable: `CLAUDE_API_KEY`
5. Deploy

**Frontend (React/Vite):**
1. Create new Vercel project
2. Select the frontend folder
3. Add environment variable: `VITE_API_URL=https://your-backend-url.vercel.app`
4. Deploy

**Update Frontend:**
After backend deployment, update `VITE_API_URL` in frontend environment variables.

### Option 2: Deploy on Railway

**Backend:**
```bash
# In backend directory
npm install -g railway
railway login
railway init
railway link
railway up
```

Set environment variables in Railway dashboard:
- `CLAUDE_API_KEY`
- `NODE_ENV=production`

**Frontend:**
```bash
# In frontend directory
npm run build
# Upload dist/ folder to Railway, Netlify, or Vercel
```

### Option 3: Docker Deployment

**Create docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - CLAUDE_API_KEY=${CLAUDE_API_KEY}
      - NODE_ENV=production

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:3000
    depends_on:
      - backend
```

Deploy:
```bash
docker-compose up -d
```

---

## 🔑 Environment Variables

### Backend (.env.local or .env.production)
```
CLAUDE_API_KEY=sk-ant-v1-xxxxxxxxxxxxxxxx
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Frontend (.env.local or .env.production)
```
VITE_API_URL=https://your-backend-url.com
```

---

## 📝 Key Features Implementation

### 1. Task Generation with Claude API
- Uses Claude 3.5 Sonnet model
- Sends structured prompt to generate user stories and engineering tasks
- Parses JSON response and saves to history

### 2. Data Persistence
- Specs stored in `backend/data/specs.json`
- Keeps last 5 generated specifications
- Auto-creates data directory on first request

### 3. Frontend State Management
- React hooks for state management
- Drag-and-drop using HTML5 API
- Local component state for editing

### 4. Export Functionality
- Generate Markdown format with structure
- Generate plain text format
- Copy to clipboard
- Download as file

---

## 🧪 Testing

### Local Testing Checklist
- [ ] Backend starts without errors
- [ ] Frontend connects to backend
- [ ] Form submission generates tasks
- [ ] Can edit tasks
- [ ] Can drag and reorder tasks
- [ ] Can delete tasks
- [ ] Export to markdown works
- [ ] Export to text works
- [ ] History shows last 5 specs
- [ ] Can load previous specs

### Example Test Flow
1. Fill form with:
   - Goal: "Build a note-taking app"
   - Users: "Students and professionals"
   - Constraints: "Web-based, real-time sync, free tier"
2. Click "Generate Tasks"
3. Verify tasks appear
4. Edit a task
5. Drag task to reorder
6. Export as markdown
7. Check History tab

---

## 📊 File Storage Structure

```
backend/
└── data/
    └── specs.json
```

**specs.json format:**
```json
[
  {
    "id": "1707707200000",
    "createdAt": "2024-02-12T10:30:00Z",
    "goal": "...",
    "users": "...",
    "constraints": "...",
    "tasks": {
      "userStories": [...],
      "engineeringTasks": [...]
    }
  }
]
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear .next cache
rm -rf backend/.next

# Reinstall dependencies
rm -rf backend/node_modules
npm install
```

### CORS errors
- Check that frontend URL is correct
- Ensure backend is running on correct port
- Frontend vite.config.js has proxy setup

### API key not working
- Verify `CLAUDE_API_KEY` is set correctly
- Check Anthropic dashboard for API key validity
- Ensure key has required permissions

### Tasks not saving
- Check `backend/data/` directory exists
- Verify write permissions
- Check backend console for errors

---

## 🎯 Production Checklist

- [ ] Environment variables set in production
- [ ] CLAUDE_API_KEY is secure and not in code
- [ ] Frontend build optimized (`npm run build`)
- [ ] Error handling tested
- [ ] CORS properly configured
- [ ] Database (data/) has proper permissions
- [ ] Monitoring/logging set up
- [ ] HTTPS enabled
- [ ] Rate limiting considered
- [ ] Backup strategy for specs.json

---

## 📚 Additional Resources

- [Claude API Docs](https://docs.anthropic.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

---

## 💡 Future Enhancements

- User authentication
- Database integration (PostgreSQL/MongoDB)
- Real-time collaboration
- Advanced templates
- Risk/unknowns section
- Task dependencies
- Gantt chart visualization
- API rate limiting
- Analytics dashboard
