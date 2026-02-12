# Deployment Guide

Complete guide for deploying Tasks Generator to production.

## Table of Contents

- [Overview](#overview)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
- [Alternative Platforms](#alternative-platforms)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Overview

Tasks Generator consists of two separate deployments:
1. **Backend**: Next.js API (requires GROQ_API_KEY)
2. **Frontend**: React SPA (requires VITE_API_URL pointing to backend)

**Recommended Platform:** Vercel (free tier available, optimized for Next.js)

## Pre-Deployment Checklist

### Code Preparation

- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] API endpoints working correctly
- [ ] Environment files configured (`.env.local`)
- [ ] `.env.example` files present for both frontend/backend
- [ ] No API keys in source code
- [ ] `.gitignore` includes `.env.local` files

### Repository Preparation

```bash
# Verify .gitignore
cat .gitignore
# Should include:
# backend/.env.local
# frontend/.env.local
# node_modules

# Check no secrets in code
grep -r "gsk_" --exclude-dir=node_modules --exclude="*.local"
# Should return no results

# Commit all changes
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### API Key Ready

- [ ] Valid Groq API key
- [ ] Key tested and working
- [ ] Key copied to clipboard for deployment

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account ([vercel.com](https://vercel.com) - sign up free)
- Repository pushed to Git provider

### Step 1: Deploy Backend

#### 1.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `Tasks Generator` repository
4. Click **"Import"**

#### 1.2 Configure Backend

**Root Directory:**
```
backend
```

**Framework Preset:**
```
Next.js
```

**Build Settings:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

#### 1.3 Add Environment Variables

Click **"Environment Variables"** section:

**Variable Name:**
```
GROQ_API_KEY
```

**Value:**
```
gsk_your_actual_groq_api_key_here
```

**Environment:** Select **All** (Production, Preview, Development)

#### 1.4 Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build
3. Note your backend URL (e.g., `https://tasks-generator-backend.vercel.app`)

#### 1.5 Test Backend

```bash
# Test API endpoint
curl -X POST https://your-backend-url.vercel.app/api/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{"goal":"Test deployment","users":"Users","constraints":"Production test"}'
```

Expected: JSON response with tasks

### Step 2: Deploy Frontend

#### 2.1 Import Same Repository

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same repository**
3. This time, configure for frontend

#### 2.2 Configure Frontend

**Root Directory:**
```
frontend
```

**Framework Preset:**
```
Vite
```

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
