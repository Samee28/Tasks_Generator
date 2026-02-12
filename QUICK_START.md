# 🚀 Quick Start (2 Minutes)

## Get Running Immediately

### Step 1️⃣: Clone
```bash
git clone https://github.com/Samee28/Tasks_Generator.git
cd tasks-generator
```

### Step 2️⃣: Get API Key
1. Go to: https://console.anthropic.com
2. Sign up for free
3. Copy your API key

### Step 3️⃣: Setup Backend
```bash
cd backend
cp .env.example .env.local
# Edit .env.local and paste your API key
nano .env.local
npm install
```

### Step 4️⃣: Setup Frontend
```bash
cd ../frontend
npm install
```

### Step 5️⃣: Run
**Open Terminal 1:**
```bash
cd backend
npm run dev
```

**Open Terminal 2:**
```bash
cd frontend
npm run dev
```

### Step 6️⃣: Use
Visit: **http://localhost:5173**

---

## 💡 Example Usage

1. Fill the form:
   - **Goal**: "Build an AI chatbot"
   - **Users**: "Business teams"
   - **Constraints**: "Real-time, accurate, secure"

2. Click "Generate Tasks" (Wait 5 seconds)

3. You'll get user stories and engineering tasks

4. Edit, reorder, or export!

---

## 📚 Need Help?

- **Setup issues?** → See [SETUP.md](./SETUP.md)
- **Deploy to web?** → See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **How it works?** → See [README.md](./README.md)
- **Full details?** → See [IMPLEMENTATION.md](./IMPLEMENTATION.md)

---

**That's it! You're ready to generate tasks with AI!** ✨
