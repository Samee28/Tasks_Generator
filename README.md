# Tasks Generator 🚀

> AI-powered web application that transforms project ideas into actionable user stories and engineering tasks using Groq AI.

## 🎯 Overview

Tasks Generator is a **full-stack Next.js application** with an interactive UI that uses **Groq's Llama 3.3 70B model** to automatically generate structured task breakdowns from simple project descriptions. Perfect for project planning, sprint preparation, and requirement analysis.

**Repository:** [github.com/Samee28/Tasks_Generator](https://github.com/Samee28/Tasks_Generator)

## ✨ Key Features

### Core Functionality
- **📝 Interactive Form**: Fill in goal, target users, constraints, and risks/unknowns
- **✨ Smart Templates**: Pre-built templates for Web Apps, Mobile Apps, and Internal Tools
- **🤖 AI-Powered Generation**: Leverages Groq's llama-3.3-70b-versatile model (70B parameters)
- **📊 Structured Output**: Generates user stories and engineering tasks with descriptions

### Task Management
- **✏️ Edit Tasks**: Click to edit any task title or description inline
- **🗑️ Delete Tasks**: Remove unwanted tasks with one click
- **🔄 Drag & Drop**: Reorder tasks by dragging them to new positions
- **📦 Collapsible Groups**: Collapse/expand user stories and engineering tasks sections

### Export & History
- **📥 Multiple Export Formats**: Download or copy as Markdown (.md) or Plain Text (.txt)
- **📋 Copy to Clipboard**: One-click copy in either format
- **📜 History Viewer**: Access your last 5 generated specifications
- **🔄 Reload Specs**: Load any previous specification to view or edit

### Additional Features
- **⚠️ Risk Assessment**: Optional field for documenting risks and unknowns
- **🎨 Professional UI**: Modern gradient design with dark mode support
- **⚡ Fast Performance**: Next.js 16 with Turbopack for rapid development
- **🔒 Secure**: API keys managed through environment variables

## 🛠️ Technology Stack

- **Next.js 16.1.6** - Full-stack React framework with App Router
- **React 19** - UI components with hooks
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Modern styling with gradients and animations
- **Groq API** - llama-3.3-70b-versatile model (70B parameters)
- **File-based Storage** - JSON persistence in `/data` folder

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** or higher
- **npm** package manager
- **Groq API key** - [Get free key at console.groq.com](https://console.groq.com)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/Samee28/Tasks_Generator.git
cd "Tasks Generator"

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Edit .env.local and add your Groq API key
# GROQ_API_KEY=gsk_your_actual_api_key_here

# 5. Start development server
npm run dev
```

**Application runs at:** `http://localhost:3000`

Open your browser and visit the app to start generating tasks!

## 📋 How to Use the Web App

### 1. Fill in the Form

1. **Enter Goal**: Describe your feature or project (e.g., "Build a todo app with real-time collaboration")
2. **Target Users**: Who will use this? (e.g., "Students, Teachers, Project managers")
3. **Constraints**: Any requirements or limits (e.g., "Mobile-first design, Must work offline")
4. **Risks/Unknowns** *(Optional)*: Document concerns (e.g., "Third-party API reliability")

**Or use a Template:**
- Click "✨ Use Template" to quick-fill with pre-made examples
- Choose from Web Application, Mobile Application, or Internal Tool templates

### 2. Generate Tasks

- Click "🚀 Generate Tasks" button
- AI will process your input (~1-2 seconds)
- Tasks appear organized in two sections:
  - 📖 **User Stories**: Customer-focused features
  - ⚙️ **Engineering Tasks**: Technical implementation steps

### 3. Manage Your Tasks

**Edit Tasks:**
- Click the ✏️ icon on any task
- Modify title and description
- Click "✓ Save" to confirm changes

**Delete Tasks:**
- Click the 🗑️ icon to remove a task
- Changes are immediate

**Reorder Tasks:**
- Drag any task card to a new position
- Drop it where you want it in the list
- Works within each section (User Stories or Engineering Tasks)

**Collapse Sections:**
- Click section headers to show/hide tasks
- Useful when focusing on specific areas

### 4. Export Results

Click "📥 Export Results" to expand options:

**Markdown Format** (.md):
- Click "📋 Copy" to copy to clipboard
- Click "⬇️ Download .md" to save as file
- Perfect for documentation, GitHub, Notion

**Plain Text Format** (.txt):
- Click "📋 Copy" to copy to clipboard
- Click "⬇️ Download .txt" to save as file
- Great for emails, notes, simple sharing

**Preview:**
- Click "👁️ Preview Markdown" to see formatted output before exporting

### 5. View History

- Click "📜 View History (Last 5)" to see previous generations
- Each entry shows: date, goal, users, constraints, and risks
- Click "📂 Load This Spec" to restore any previous specification
- Loaded specs can be edited and re-exported

## 🔌 API Endpoints (for developers)

The app also exposes REST API endpoints:
  }'
```

**Response includes:**
- Unique specification ID
- Timestamp
- User stories (5-7 stories)
- Engineering tasks (5-8 tasks)
- All input parameters

### 2. View History

Fetch your last 5 task generations:

```bash
curl http://localhost:3000/api/specs
```

### 3. Get Specific Spec

Retrieve full details of a specific generation:

```bash
curl http://localhost:3000/api/specs/{spec-id}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required: Your Groq API Key
GROQ_API_KEY=gsk_your_actual_api_key_here
```

### Getting Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a **free account** (no credit card required)
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy the key and paste into `.env.local`

**Note:** Free tier includes generous usage limits suitable for development and small projects.

## 📁 Project Structure

```
Tasks Generator/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── generate-tasks/
│   │   │   └── route.ts      # POST - Generate tasks with Groq AI
│   │   └── specs/
│   │       ├── route.ts      # GET - Fetch history list
│   │       └── [id]/
│   │           └── route.ts  # GET - Fetch specific spec
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
│
├── lib/
│   └── specs.ts              # Data persistence functions
│
├── data/
│   └── specs.json            # Task history storage (auto-created)
│
├── .env.local                # Environment variables (gitignored)
├── .env.example              # Environment template (in git)
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
│
├── README.md                 # This file
├── QUICK_START.md            # 5-minute setup guide
├── SETUP.md                  # Detailed configuration
├── DEPLOYMENT.md             # Deployment instructions
└── LICENSE                   # MIT License
```

## 🚢 Deployment

### Deploy to Render (Recommended for Backend)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name:** `tasks-generator-api`
     - **Root Directory:** (leave empty)
     - **Environment:** `Node`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
   - Add Environment Variable:
     - **Key:** `GROQ_API_KEY`
     - **Value:** Your Groq API key
   - Click **"Create Web Service"**

4. **Test Deployment**
   ```bash
   # Replace with your Render URL
   curl https://tasks-generator-api.onrender.com/api/specs
   ```

**Free Tier:** Render offers free hosting with automatic HTTPS and custom domains.

### Deploy to Vercel (Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to deploy
```

Add `GROQ_API_KEY` environment variable in Vercel dashboard.

### Environment Variables for Production

**Required:**
- `GROQ_API_KEY` - Your Groq API key

**Optional:**
- `NODE_ENV=production` - Automatically set by most platforms

## 🔒 Security & Best Practices

### Security Features

- ✅ **API Keys Protected**: Stored in `.env.local` (gitignored)
- ✅ **No Credentials in Code**: Template `.env.example` provided
- ✅ **TypeScript Strict Mode**: Type safety throughout
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Input Validation**: Request body validation

### Best Practices

```bash
# ✅ DO: Use environment variables
GROQ_API_KEY=your_key_here

# ❌ DON'T: Hardcode API keys
const apiKey = "gsk_abc123..."  // Never do this!

# ✅ DO: Keep .env.local in .gitignore
echo ".env.local" >> .gitignore

# ✅ DO: Use .env.example for documentation
cp .env.example .env.local
```

### Data Persistence

- **Storage:** File-based JSON in `/data/specs.json`
- **Limit:** Last 5 specifications (FIFO)
- **Auto-create:** Directory and file created automatically
- **Backup:** Regular commits keep history in git (without API keys)

## 🐛 Troubleshooting

### Issue: "API key not found" error

**Solution:**
```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Verify API key is set
cat .env.local | grep GROQ_API_KEY

# 3. Restart development server
npm run dev
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Tasks not generating

**Checklist:**
- ✓ Groq API key is valid (test at console.groq.com)
- ✓ Internet connection is active
- ✓ Check terminal for error messages
- ✓ Verify request format matches API docs

### Issue: Build fails

**Solution:**
```bash
# Clean build cache
rm -rf .next

# Rebuild
npm run build
```

## 📡 API Reference

### POST `/api/generate-tasks`

Generate tasks using Groq AI.

**Request Body:**
```json
{
  "goal": "Build a todo app",
  "users": "Students",
  "constraints": "Simple UI, mobile-first"
}
```

**Response (200 OK):**
```json
{
  "id": "1770922829502",
  "createdAt": "2026-02-12T19:00:29.502Z",
  "goal": "Build a todo app",
  "users": "Students",
  "constraints": "Simple UI, mobile-first",
  "tasks": {
    "userStories": [
      {
        "title": "User Can Create Todos",
        "description": "As a student, I want to create new todo items so that I can track my assignments"
      },
      {
        "title": "User Can View Todo List",
        "description": "As a student, I want to see all my todos in one place"
      }
    ],
    "engineeringTasks": [
      {
        "title": "Design Database Schema",
        "description": "Create database tables for todos with fields: id, title, description, status, createdAt"
      },
      {
        "title": "Build Todo API Endpoints",
        "description": "Implement CRUD operations: POST /todos, GET /todos, PUT /todos/:id, DELETE /todos/:id"
      }
    ]
  }
}
```

**Response Time:** ~1-2 seconds  
**Typical Output:** 5-7 user stories, 5-8 engineering tasks

---

### GET `/api/specs`

Retrieve list of last 5 task generations (history).

**Response (200 OK):**
```json
[
  {
    "id": "1770922829502",
    "createdAt": "2026-02-12T19:00:29.502Z",
    "goal": "E-commerce website",
    "users": "Online shoppers",
    "constraints": "Secure payment gateway"
  },
  {
    "id": "1770921987642",
    "createdAt": "2026-02-12T18:46:27.642Z",
    "goal": "Build a todo app",
    "users": "Students",
    "constraints": "Simple UI"
  }
]
```

**Note:** Returns empty array `[]` if no generations exist yet.

---

### GET `/api/specs/:id`

Get full details of a specific task generation.

**Example:** `GET /api/specs/1770922829502`

**Response (200 OK):**
Returns complete spec object with all user stories and engineering tasks (same format as POST response).

**Response (404 Not Found):**
```json
{
  "error": "Spec not found"
}
```

## 🧪 Testing & Verification

### ✅ All Tests Passing

The project has been thoroughly tested with all endpoints verified:

```bash
# Test 1: Get specs list (empty initially)
✓ GET /api/specs → 200 OK (6ms)
Response: []

# Test 2: Generate tasks with AI
✓ POST /api/generate-tasks → 200 OK (1404ms)
Generated: 5 user stories, 5 engineering tasks

# Test 3: Verify history updated
✓ GET /api/specs → 200 OK (11ms)
Response: 2 specs in history

# Test 4: Get specific spec
✓ GET /api/specs/[id] → 200 OK (516ms)
Response: Full spec with all tasks

# Test 5: File persistence
✓ data/specs.json created (5.4KB, 70 lines)

# Test 6: Production build
✓ npm run build → Success
All 5 routes compiled successfully
```

### Run Tests Yourself

```bash
# Start server
npm run dev

# In another terminal, run these tests:

# 1. Test specs endpoint
curl http://localhost:3000/api/specs

# 2. Generate tasks
curl -X POST http://localhost:3000/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "E-commerce website",
    "users": "Online shoppers",
    "constraints": "Secure payment gateway"
  }'

# 3. Verify file was created
ls -lh data/specs.json

# 4. Test production build
npm run build
```

## 📊 Performance & Limits

### Response Times

- **GET /api/specs**: ~5-15ms (local file read)
- **POST /api/generate-tasks**: ~1-2 seconds (Groq API call)
- **GET /api/specs/:id**: ~5-15ms (local file read)

### Groq API Limits (Free Tier)

- **Rate Limit**: 30 requests per minute
- **Context Window**: 32,768 tokens
- **Model**: llama-3.3-70b-versatile (70 billion parameters)
- **Cost**: Free for development use

### Storage Limits

- **History**: Last 5 specifications saved
- **File Size**: ~5-10KB per specification
- **Auto-cleanup**: Oldest specs removed automatically

## 🎯 Use Cases

### Perfect For:

- 🎯 **Project Planning** - Break down new projects into actionable tasks
- 📋 **Sprint Preparation** - Generate user stories for sprints
- 💼 **Requirement Analysis** - Structure client requirements
- 🎓 **Learning** - Understand project breakdown process
- 🤖 **AI Integration** - Example of Groq API usage

### Example Projects:

```bash
# Web Application
"Build a blog platform" + "Content creators" + "SEO-friendly"

# Mobile App
"Fitness tracking app" + "Health-conscious users" + "Offline mode"

# E-commerce
"Online store" + "Small business owners" + "Payment integration"

# Internal Tool
"Employee dashboard" + "HR team" + "Real-time data"
```

## 📚 Additional Resources

### Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[SETUP.md](SETUP.md)** - Detailed configuration guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[LICENSE](LICENSE)** - MIT License details

### External Links

- **Groq Console**: [console.groq.com](https://console.groq.com)
- **Groq Docs**: [console.groq.com/docs](https://console.groq.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Repo**: [github.com/Samee28/Tasks_Generator](https://github.com/Samee28/Tasks_Generator)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Write TypeScript with strict mode
- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive

## 📄 License

**MIT License** - see [LICENSE](LICENSE) file for details.

You are free to:
- ✓ Use commercially
- ✓ Modify
- ✓ Distribute
- ✓ Private use

## 📞 Support


- 💬 **Issues**: [github.com/Samee28/Tasks_Generator/issues](https://github.com/Samee28/Tasks_Generator/issues)
- 📖 **Documentation**: Check `/docs` folder for guides

### Found a Bug?

1. Check [existing issues](https://github.com/Samee28/Tasks_Generator/issues)
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version)

---

<div align="center">

**Built with ❤️ using Next.js 16, TypeScript, and Groq AI**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/Samee28/Tasks_Generator/issues) · [Request Feature](https://github.com/Samee28/Tasks_Generator/issues) · [Documentation](QUICK_START.md)

</div>
