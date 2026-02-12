# Deployment Guide

Complete guide for deploying Tasks Generator web application to production.

## Table of Contents

- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Render Deployment (Alternative)](#render-deployment-alternative)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment Testing](#post-deployment-testing)
- [Troubleshooting](#troubleshooting)

## Overview

Tasks Generator is a **single Next.js full-stack application** that includes:
- Interactive React UI for task generation
- API routes for Groq AI integration
- File-based persistence for history

**Recommended Platform:** Vercel or Render (both have free tiers)

## Pre-Deployment Checklist

### Code Preparation

- [x] All features tested locally
- [x] Interactive UI working (forms, edit, drag-drop, export)
- [x] API endpoints working correctly
- [x] Environment file configured (`.env.local`)
- [x] `.env.example` file present
- [x] No API keys in source code
- [x] `.gitignore` includes `.env.local` and `.next` files

### Repository Preparation

```bash
# Verify .gitignore
cat .gitignore
# Should include:
# .env.local
# .next/
# node_modules/
# data/

# Check no secrets in code
grep -r "gsk_" --exclude-dir=node_modules --exclude="*.local"
# Should return no results

# Ensure latest changes are pushed
git add .
git commit -m "Ready for deployment"
git push origin main
git commit -m "Prepare for deployment"
git push origin main
```

```

### API Key Ready

- [x] Valid Groq API key
- [x] Key tested and working locally
- [x] Key ready for deployment configuration

## Vercel Deployment (Recommended)

Vercel is the easiest platform for Next.js apps with free tier and automatic HTTPS.

### Prerequisites

- GitHub account with repository pushed
- Vercel account ([vercel.com](https://vercel.com) - sign up free with GitHub)

### Step 1: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **"Add GitHub Account"** if needed
4. Find and select your **Tasks_Generator** repository
5. Click **"Import"**

### Step 2: Configure Project

**Project Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `.` (leave as root - do NOT change)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### Step 3: Add Environment Variables

In the **Environment Variables** section:

**Variable Name:**
```
GROQ_API_KEY
```

**Value:** (paste your Groq API key)
```
gsk_your_actual_groq_api_key_here
```

**Environments:** Select **All** (Production, Preview, Development)

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see: ✓ Build successful
4. Note your deployment URL (e.g., `https://tasks-generator.vercel.app`)

### Step 5: Test Your Deployment

Visit your Vercel URL and test all features:
- ✅ Fill form and generate tasks
- ✅ Edit and delete tasks
- ✅ Drag and drop to reorder
- ✅ Export as markdown/text
- ✅ View history (last 5)

**API Test:**
```bash
# Test the deployed API
curl -X POST https://your-app.vercel.app/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{"goal":"Test deployment","users":"Users","constraints":"Quick test"}'
```

Expected: JSON response with generated tasks

## Render Deployment (Alternative)

Render is another excellent free hosting platform.

### Prerequisites

- GitHub account with repository pushed
- Render account ([render.com](https://render.com) - sign up free)

### Step 1: Create Web Service

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if needed
4. Select your **Tasks_Generator** repository
5. Click **"Connect"**

### Step 2: Configure Service

**Basic Settings:**
- **Name:** `tasks-generator` (or your choice)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** (leave empty)
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

### Step 3: Add Environment Variable

1. Scroll to **Environment Variables** section
2. Click **"Add Environment Variable"**
3. Key: `GROQ_API_KEY`
4. Value: Your Groq API key
5. Click **"Save"**

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for build
3. Check logs for: "Build successful" and "Server running"
4. Note your URL (e.g., `https://tasks-generator.onrender.com`)

**Note:** Free tier on Render may spin down after inactivity. First request after idle period takes ~30 seconds.

### Step 5: Test Deployment

Visit your Render URL and test the application.

## Environment Configuration

### Required Environment Variables

**Production:**
```bash
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=production  # Auto-set by platforms
```

### Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up/log in
3. Go to **API Keys** section
4. Click **"Create API Key"**
5. Copy the key (starts with `gsk_`)
6. Add to deployment platform

### Security Notes

- ✅ Never commit `.env.local` to Git
- ✅ Use platform's environment variable management
- ✅ Different keys for dev/staging/prod (optional)
- ✅ Rotate keys periodically
- ✅ Monitor API usage in Groq dashboard

## Post-Deployment Testing

### Checklist

Test these features on your deployed app:

- [ ] Homepage loads correctly
- [ ] Form submission works
- [ ] Templates work (Web/Mobile/Internal Tool)
- [ ] AI generates tasks (wait ~1-2 seconds)
- [ ] User stories display correctly
- [ ] Engineering tasks display correctly
- [ ] Edit task works (pencil icon)
- [ ] Delete task works (trash icon)
- [ ] Drag and drop reordering works
- [ ] Collapse/expand sections works
- [ ] Export as Markdown works
- [ ] Export as Plain Text works
- [ ] Copy to clipboard works
- [ ] Download files works
- [ ] History shows last 5 specs
- [ ] Load previous spec works
- [ ] Dark mode toggle works (if implemented)
- [ ] Mobile responsive design works

### Performance Testing

```bash
# Check response times
time curl https://your-app.vercel.app/api/specs

# Load test (optional)
ab -n 10 -c 2 https://your-app.vercel.app/
```

Expected:
- Homepage: < 2 seconds
- API specs: < 100ms
- Task generation: 1-3 seconds (AI processing)

## Troubleshooting

### Build Fails

**Error:** "Cannot find module 'next'"
- **Solution:** Check `package.json` has all dependencies
- Run `npm install` locally to test

**Error:** "GROQ_API_KEY is not defined"
- **Solution:** Add environment variable in platform settings
- Redeploy after adding variable

### Runtime Errors

**Error:** "Failed to generate tasks"
- **Solution:** Check Groq API key is correct
- Test key locally first
- Check Groq API status

**Error:** "Cannot write to /data/specs.json"
- **Solution:** File persistence works but may reset on platform restarts
- This is expected on serverless platforms
- History still works within session

### Performance Issues

**Slow first load on Render:**
- Normal for free tier (cold starts)
- First request ~30 seconds
- Subsequent requests fast

**Timeout on task generation:**
- Check internet connection
- Verify Groq API is responding
- Try simpler prompt first

### UI Issues

**Components not rendering:**
- Check browser console for errors
- Verify all component files deployed
- Check import paths are correct

**Drag and drop not working:**
- Ensure using modern browser
- Check JavaScript is enabled
- Try desktop browser (mobile may vary)

## Keeping Your App Live

### Best Practices

1. **Monitor Uptime:**
   - Use services like UptimeRobot (free)
   - Ping your app every 5 minutes
   - Get alerts if down

2. **Regular Testing:**
   - Test weekly to ensure still working
   - Check before any interviews/demos
   - Verify API key hasn't expired

3. **Platform Limits:**
   - **Vercel Free:** 100GB bandwidth/month
   - **Render Free:** 750 hours/month, sleeps after 15min idle
   - Monitor usage in dashboards

4. **Backups:**
   - Keep Git repository updated
   - Export specs.json periodically
   - Document any custom changes

### If Link Goes Down

1. Check platform status pages
2. Verify environment variables still set
3. Check recent commits didn't break build
4. Redeploy from dashboard
5. Check logs for errors

---

## Quick Deploy Commands

**Vercel CLI (fastest):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd "Tasks Generator"
vercel

# Add environment variable
vercel env add GROQ_API_KEY

# Deploy to production
vercel --prod
```

**Render:**
- Use dashboard (no CLI deployment needed)

---

## Support

**Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)  
**Render Docs:** [render.com/docs](https://render.com/docs)  
**Groq API:** [console.groq.com/docs](https://console.groq.com/docs)

---

**Your app is now live! Share the URL with others. 🎉**

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

#### 2.3 Add Environment Variables

**Variable Name:**
```
VITE_API_URL
```

**Value:**
```
https://your-backend-url.vercel.app
```
(Use the backend URL from Step 1.4)

**Environment:** Select **All**

#### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. Note your frontend URL (e.g., `https://tasks-generator.vercel.app`)

#### 2.5 Test Frontend

1. Visit your frontend URL in browser
2. Enter project details
3. Click "Generate Tasks"
4. Verify tasks are generated successfully

### Step 3: Update README

Update your README.md with live demo link:

```markdown
**Live Demo:** https://tasks-generator.vercel.app
```

Commit and push:
```bash
git add README.md
git commit -m "Add live demo link"
git push origin main
```

## Alternative Platforms

### Netlify

**Backend:**
- Not recommended (Netlify functions have different structure)
- Consider using Vercel for backend

**Frontend:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `frontend/dist`
4. Environment: `VITE_API_URL=<your-backend-url>`

### Railway

**Backend:**
1. Connect repository
2. Root directory: `backend`
3. Environment: `GROQ_API_KEY`
4. Custom start command: `npm run start`

**Frontend:**
- Not ideal for static sites
- Use Vercel/Netlify for frontend

### Render

**Backend (Web Service):**
1. Connect repository
2. Root directory: `backend`
3. Build: `npm install && npm run build`
4. Start: `npm run start`
5. Environment: `GROQ_API_KEY`

**Frontend (Static Site):**
1. Connect repository
2. Root directory: `frontend`
3. Build: `npm install && npm run build`
4. Publish: `dist`
5. Environment: `VITE_API_URL`

## Environment Configuration

### Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GROQ_API_KEY` | Yes | Groq API authentication | `gsk_xxx...` |

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API URL | `https://api.example.com` |

### Security Best Practices

✅ **DO:**
- Use environment variables for all secrets
- Set different keys for production/staging
- Rotate API keys regularly
- Use `.env.example` as template
- Keep `.env.local` in `.gitignore`

❌ **DON'T:**
- Commit API keys to git
- Hardcode secrets in code
- Share API keys publicly
- Use development keys in production
- Expose keys in client-side code

## Post-Deployment

### Verify Functionality

1. **Test Task Generation**
   - Enter project details
   - Generate tasks
   - Verify AI response

2. **Test Task Management**
   - Edit tasks
   - Delete tasks
   - Reorder with drag-and-drop

3. **Test Export**
   - Export as Markdown
   - Export as Text
   - Copy to clipboard

4. **Test History**
   - Generate multiple tasks
   - View history tab
   - Load previous specifications

### Monitor Performance

**Vercel Dashboard:**
- Check deployment logs
- Monitor function invocations
- Track bandwidth usage
- Review error logs

**Groq Console:**
- Monitor API usage
- Check rate limits
- Review request logs
- Track costs (if on paid plan)

### Set Up Custom Domain (Optional)

**Vercel:**
1. Go to project settings
2. Navigate to "Domains"
3. Add your domain
4. Update DNS records (provided by Vercel)
5. Wait for DNS propagation (5-30 minutes)

### Enable Analytics (Optional)

**Vercel Analytics:**
```bash
cd frontend
npm install @vercel/analytics
```

Update `frontend/src/main.jsx`:
```javascript
import { inject } from '@vercel/analytics';
inject();
```

## Troubleshooting

### Backend Issues

#### "API Key Invalid"
- Verify `GROQ_API_KEY` in Vercel environment variables
- Check key is active in Groq Console
- Redeploy after updating environment variables

#### "Function Timeout"
- Groq API might be slow
- Check Vercel function logs
- Consider increasing timeout (Pro plan)

#### "Build Failed"
```bash
# Check logs in Vercel dashboard
# Common fixes:
- Verify package.json is correct
- Check Node.js version compatibility
- Review build logs for specific errors
```

### Frontend Issues

#### "Cannot Connect to API"
- Verify `VITE_API_URL` is set correctly
- Must include `https://` prefix
- Should not have trailing slash
- Check backend is deployed and working

#### "CORS Errors"
Backend should automatically handle CORS, but if issues persist:

Update `backend/next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-frontend.vercel.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

#### "Environment Variable Not Found"
- Vercel requires `VITE_` prefix for client-side variables
- Redeploy after adding/updating environment variables
- Check variable is set in correct environment (Production/Preview/Development)

### General Issues

#### "Too Many Requests"
- Groq free tier: 30 requests/minute
- Add rate limiting on backend
- Consider caching responses
- Upgrade Groq plan if needed

#### "Slow Performance"
- Enable Vercel Edge Functions
- Implement response caching
- Optimize bundle size
- Use production builds

## Deployment Costs

### Free Tier Limits

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- Unlimited previews
- Commercial use allowed

**Groq (Free):**
- 14,400 requests/day
- 30 requests/minute
- Should be sufficient for small to medium projects

### Scaling Considerations

**When to Upgrade:**
- More than 14,000 API calls/day
- Need faster rate limits
- Require custom timeouts
- Want custom domains

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs
- Monitor API usage
- Review performance metrics

**Monthly:**
- Update dependencies
- Review security advisories
- Rotate API keys
- Check Groq/Vercel usage

**As Needed:**
- Redeploy after code changes
- Update environment variables
- Scale resources if needed

### Updates and Patches

```bash
# Update dependencies
npm update

# Check for security issues
npm audit
npm audit fix

# Test locally
npm run dev

# Commit and push (triggers auto-deploy on Vercel)
git add .
git commit -m "Update dependencies"
git push origin main
```

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Groq API Docs**: [console.groq.com/docs](https://console.groq.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vite Deployment**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)

## Quick Reference

### Redeploy Backend
```bash
git add backend/
git commit -m "Update backend"
git push origin main
# Vercel auto-deploys
```

### Redeploy Frontend
```bash
git add frontend/
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys
```

### Update Environment Variable
1. Go to Vercel project settings
2. Click "Environment Variables"
3. Edit variable
4. Trigger manual redeploy or push code change

### Rollback Deployment
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous successful deployment
4. Click three dots → "Promote to Production"
