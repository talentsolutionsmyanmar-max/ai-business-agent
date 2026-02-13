# Deployment Guide for AI Business Agent

## Option 1: Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name it: ai-business-agent
   - Make it private or public
   - Don't initialize with README

2. **Push Code to GitHub**
   ```bash
   cd /home/z/my-project
   git init
   git add .
   git commit -m "AI Business Agent Dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-business-agent.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New..." → "Project"
   - Import your repository
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get your live URL: https://your-app.vercel.app

## Option 2: Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Next.js and deploy
6. Get your URL: https://your-app.up.railway.app

## Option 3: Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

## Option 4: Self-Hosted (VPS/Docker)

### Build for Production
```bash
cd /home/z/my-project
bun run build
```

### Run with Docker
```bash
# Create Dockerfile
# Build and run
docker build -t ai-business-agent .
docker run -p 3000:3000 ai-business-agent
```

## Environment Variables

If you need to add API keys for production:
1. In Vercel: Settings → Environment Variables
2. Add any required keys

## Custom Domain

After deployment:
1. Go to your deployment dashboard
2. Add custom domain (e.g., app.yourcompany.com)
3. Update DNS records as instructed
