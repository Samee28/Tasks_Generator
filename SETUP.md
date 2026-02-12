# Setup Guide

Detailed setup instructions for Tasks Generator.

## Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Groq API Setup](#groq-api-setup)
- [Backend Configuration](#backend-configuration)
- [Frontend Configuration](#frontend-configuration)
- [Running the Application](#running-the-application)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## System Requirements

### Required
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Operating System**: macOS, Linux, or Windows
- **RAM**: Minimum 4GB
- **Internet Connection**: Required for API calls

### Recommended
- **Node.js**: Version 20.x (LTS)
- **Code Editor**: VS Code with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript

## Installation

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd "Tasks Generator"
```

### 2. Install Root Dependencies

```bash
npm install
```

This installs dependencies for both frontend and backend through the workspace configuration.

### 3. Verify Installation

```bash
# Check Node.js version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be 9.0.0 or higher

# Verify project structure
ls -la
# Should see: backend/ frontend/ package.json .gitignore
```

## Groq API Setup

### Create Groq Account

1. Visit [console.groq.com](https://console.groq.com)
2. Click "Sign Up" (free account)
3. Verify your email address
4. Log in to Groq Console

### Generate API Key

1. In Groq Console, navigate to **API Keys** section
2. Click **"Create API Key"** button
3. Give it a name (e.g., "Tasks Generator Dev")
4. **Copy the key immediately** (you won't see it again!)
5. Store it safely

**Example API Key format:**
```
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### API Key Best Practices

- ✅ Store in `.env.local` files (never in code)
- ✅ Create separate keys for dev/production
- ✅ Rotate keys periodically
- ❌ Never commit keys to git
- ❌ Never share keys publicly

## Backend Configuration

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

### 3. Edit Environment File

Open `backend/.env.local` in your editor:

```bash
# Using nano
nano .env.local

# Or using VS Code
code .env.local
```

Add your Groq API key:
```bash
GROQ_API_KEY=gsk_your_actual_key_here
```

**Important:** Make sure there's a newline at the end of the file!

### 4. Verify Configuration

```bash
# Check file exists
ls -la .env.local

# Check content (be careful not to expose your key!)
cat .env.local | head -1
# Should show: GROQ_API_KEY=gsk_...
```

### 5. Install Backend Dependencies

```bash
npm install
```

This installs:
- Next.js 16
- TypeScript 5
- Node.js types

## Frontend Configuration

### 1. Navigate to Frontend

```bash
cd ../frontend
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

### 3. Configure for Development

For **local development**, edit `frontend/.env.local`:

```bash
# Leave empty to use Vite proxy
VITE_API_URL=
```

For **production**, you'll set this to your deployed backend URL:

```bash
# Example for Vercel deployment
VITE_API_URL=https://your-backend.vercel.app
```

### 4. Install Frontend Dependencies

```bash
npm install
```

This installs:
- React 18
- Vite 7
- Development tools

## Running the Application

### Start Backend Server

**Terminal 1:**
```bash
cd backend
npm run dev
```

Expected output:
```
▲ Next.js 16.1.6 (Turbopack)
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 1.2s
```

### Start Frontend Server

**Terminal 2:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v7.3.1  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Access Application

Open your browser to: **http://localhost:5173**

## Verification

### Test Backend API

```bash
# Test generate-tasks endpoint
curl -X POST http://localhost:3000/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{"goal":"Test project","users":"Developers","constraints":"Quick test"}'
```

**Expected Response:**
- Status: 200 OK
- Body: JSON with `id`, `tasks.userStories[]`, `tasks.engineeringTasks[]`

### Test Frontend

1. **Open App**: http://localhost:5173
2. **Enter Data**:
   - Goal: "Build a todo app"
   - Users: "Students"
   - Constraints: "Simple UI"
3. **Click**: "Generate Tasks"
4. **Verify**: Tasks appear in organized sections

### Verify Data Persistence

```bash
# Check history file exists
ls -la backend/data/specs.json

# View last generation
cat backend/data/specs.json | head -20
```

## Troubleshooting

### Backend Issues

#### "Cannot find module 'next'"
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### "API key not found"
```bash
# Verify .env.local exists
ls -la backend/.env.local

# Check content
cat backend/.env.local

# Recreate if needed
echo "GROQ_API_KEY=your_key_here" > backend/.env.local
```

#### "Port 3000 already in use"
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Frontend Issues

#### "Cannot find module 'react'"
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### "Failed to fetch"
- Verify backend is running: `curl http://localhost:3000/api/specs`
- Check VITE_API_URL in `frontend/.env.local`
- For local dev, it should be empty

#### "Port 5173 already in use"
```bash
# Kill existing Vite process
pkill -f vite

# Or specify different port
npm run dev -- --port 5174
```

### API Issues

#### "Invalid API Key"
1. Go to [console.groq.com](https://console.groq.com)
2. Verify key is active
3. Generate new key if needed
4. Update `backend/.env.local`
5. Restart backend server

#### "Rate limit exceeded"
- Free tier: 30 requests/minute
- Wait 1 minute and try again
- Consider upgrading Groq plan

#### "Network error"
- Check internet connection
- Verify Groq API status: [status.groq.com](https://status.groq.com)
- Check firewall settings

### General Issues

#### Cache Problems
```bash
# Clear Next.js cache
rm -rf backend/.next

# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Restart servers
```

#### Permission Errors
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $USER:$USER .
```

#### Git Issues
```bash
# Reset to clean state
git reset --hard HEAD
git clean -fd

# Reinstall
npm install
```

## Next Steps

- **Development**: Start building features
- **Testing**: Test all functionality
- **Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Documentation**: Read [README.md](README.md)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Groq API Documentation](https://console.groq.com/docs)

## Getting Help

1. Check this guide thoroughly
2. Review error messages carefully
3. Search existing GitHub issues
4. Open new issue with:
   - Error message
   - Steps to reproduce
   - System info (OS, Node version)
   - Relevant logs
