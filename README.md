# Tasks Generator

A modern web app that generates user stories and engineering tasks from feature ideas using AI.

## Features

✨ **Core Features**
- Fill a form about a feature idea (goal, users, constraints)
- Generate a list of user stories and engineering tasks using Claude AI
- Edit, reorder, and delete tasks
- Export results as markdown or text
- View last 5 generated specifications

🎨 **Enhancements**
- Built-in templates (Web App, Mobile App, Internal Tool)
- Drag-and-drop to reorder tasks
- Group tasks by type (User Stories vs Engineering Tasks)
- Responsive design for mobile and desktop
- Local persistent storage

## Project Structure

```
tasks-generator/
├── frontend/              # React + Vite frontend app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── App.css        # Styling
│   ├── package.json
│   └── vite.config.js
│
└── backend/               # Next.js API backend
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   ├── generate-tasks/   # POST endpoint for generating tasks
    │   │   │   └── specs/            # GET endpoints for specs
    │   │   └── ...
    │   └── lib/
    │       └── specs.ts   # Data persistence layer
    ├── package.json
    ├── next.config.js
    └── .env.example
```

## Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Modern CSS3

**Backend:**
- Next.js 15 (TypeScript)
- Claude API (AI task generation)
- File-based persistence

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Claude API key from [Anthropic](https://console.anthropic.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Samee28/Tasks_Generator.git
cd tasks-generator
```

2. Set up the backend:
```bash
cd backend
cp .env.example .env.local
# Add your CLAUDE_API_KEY to .env.local
npm install
```

3. Set up the frontend:
```bash
cd ../frontend
cp .env.example .env.local
npm install
```

### Running Locally

**Terminal 1 - Backend (Next.js):**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3000`

**Terminal 2 - Frontend (React + Vite):**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

The frontend will proxy API requests to the backend automatically.

## Usage

1. **Generate Tasks:**
   - Fill in the Feature Goal, Target Users, and Constraints
   - Optionally select a template for quick setup
   - Click "Generate Tasks" button
   - AI generates user stories and engineering tasks

2. **Manage Tasks:**
   - **Edit**: Click the Edit button on any task to modify it
   - **Delete**: Remove tasks you don't need
   - **Reorder**: Drag and drop tasks within a group
   - **Add**: Add custom tasks manually

3. **Export:**
   - Choose Markdown or Text format
   - Copy to clipboard or download as file
   - Share with team members

4. **View History:**
   - See last 5 generated specifications
   - Click "Load This Spec" to restore previous work

## Environment Variables

### Backend (.env.local)
```
CLAUDE_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000
```

## API Endpoints

### POST /api/generate-tasks
Generate user stories and engineering tasks from a feature spec.

**Request:**
```json
{
  "goal": "Build a task management app",
  "users": "Busy professionals",
  "constraints": "Mobile-first, offline support"
}
```

**Response:**
```json
{
  "id": "1707707200000",
  "createdAt": "2024-02-12T10:00:00.000Z",
  "goal": "...",
  "users": "...",
  "constraints": "...",
  "tasks": {
    "userStories": [...],
    "engineeringTasks": [...]
  }
}
```

### GET /api/specs
Get summary of last 5 specifications.

### GET /api/specs/:id
Get full details of a specific specification.

## Code Quality

- ✅ Clean, modular component structure
- ✅ Proper separation of frontend and backend
- ✅ TypeScript for type safety (backend)
- ✅ Environment variables properly managed
- ✅ No API keys in source code
- ✅ Error handling and validation

## Deployment

### Hosting Requirements

**Frontend (Vercel recommended):**
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

**Backend (Vercel, Netlify, or any Node.js host):**
```bash
cd backend
npm run build
npm start
```

### Environment Setup
Set the following environment variables in your hosting platform:
- `CLAUDE_API_KEY` - Your Claude API key
- `NEXT_PUBLIC_API_URL` - URL to access the backend

## Contributing

Feel free to fork and submit pull requests for any improvements.

## License

MIT
