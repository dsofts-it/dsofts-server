# 🚀 GitHub & Render Deployment Checklist

## ✅ Pre-Deployment Checklist

### Files Created

- [x] render.yaml - Render deployment configuration
- [x] .dockerignore - Docker optimization
- [x] DEPLOYMENT.md - Deployment guide
- [x] .env.production - Production environment template
- [x] .gitignore - Updated to exclude sensitive files

### Git Repository

- [x] Git initialized
- [x] All files committed
- [x] Branch renamed to 'main'
- [x] Remote added: https://github.com/dsofts/dsofts-server.git

## 📋 Next Steps

### Step 1: Create GitHub Repository

**Option A: Via GitHub Website**

1. Go to https://github.com/new
2. Repository name: `dsofts-server`
3. Description: "Backend API for DSofts IT Services"
4. Visibility: Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

**Option B: Via GitHub CLI**

```bash
gh repo create dsofts/dsofts-server --public --description "Backend API for DSofts IT Services"
```

### Step 2: Push to GitHub

Run these commands in your terminal:

```bash
# Verify remote is set
git remote -v

# Push to GitHub
git push -u origin main
```

If you encounter authentication issues:

```bash
# Use GitHub CLI
gh auth login

# Or use Personal Access Token
# GitHub → Settings → Developer settings → Personal access tokens
```

### Step 3: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account / Sign in
3. Create a **FREE** cluster (M0 Sandbox)
4. Choose cloud provider & region (closest to your users)
5. Cluster name: `dsofts-cluster`
6. Click "Create Cluster" (takes 3-5 minutes)

**Configure Database Access:**

1. Database Access → Add New Database User
   - Username: `dsofts_admin`
   - Password: Generate secure password (save it!)
   - User Privileges: Atlas admin
2. Network Access → Add IP Address
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Comment: "Render deployment"

**Get Connection String:**

1. Clusters → Connect → Connect your application
2. Driver: Node.js, Version: 4.1 or later
3. Copy connection string:
   ```
   mongodb+srv://dsofts_admin:<password>@dsofts-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `/dsofts` before the `?`
   ```
   mongodb+srv://dsofts_admin:yourpassword@dsofts-cluster.xxxxx.mongodb.net/dsofts?retryWrites=true&w=majority
   ```

### Step 4: Deploy on Render

1. Go to https://render.com
2. Sign up / Sign in (use GitHub for easy integration)
3. Click "New +" → "Web Service"
4. Connect GitHub repository: `dsofts/dsofts-server`
5. Configure:

   - **Name**: `dsofts-server`
   - **Environment**: Node
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Add Environment Variables** (click "Advanced"):

   ```
   NODE_ENV = production
   PORT = 5000
   MONGO_URI = mongodb+srv://dsofts_admin:yourpassword@dsofts-cluster.xxxxx.mongodb.net/dsofts?retryWrites=true&w=majority
   JWT_SECRET = [Click "Generate" for random secure value]
   JWT_EXPIRES_IN = 7d
   CLIENT_URL = * (or your frontend URL)
   ```

7. Click "Create Web Service"

8. Wait for deployment (3-5 minutes)

### Step 5: Verify Deployment

Your API will be live at:

```
https://dsofts-server.onrender.com
```

**Test endpoints:**

1. Health Check:

   ```bash
   curl https://dsofts-server.onrender.com
   ```

2. Signup:

   ```bash
   curl -X POST https://dsofts-server.onrender.com/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. Login:
   ```bash
   curl -X POST https://dsofts-server.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

### Step 6: Seed Production Database (Optional)

1. Go to Render Dashboard → dsofts-server → Shell
2. Run:
   ```bash
   npm run seed
   ```

This creates:

- Admin user: rohan@dsofts.in / Rohan123
- Regular user: john@example.com / password123
- 5 portfolio projects
- 6 services

### Step 7: Update Frontend

Update your frontend API URL:

```javascript
// For production
const API_URL = 'https://dsofts-server.onrender.com/api';

// For development
const API_URL = 'http://localhost:5000/api';
```

Or use environment variables:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

## 🔧 Post-Deployment

### Monitor Your Application

**Render Dashboard:**

- Logs: Real-time application logs
- Metrics: CPU, Memory, Request count
- Events: Deployment history

**MongoDB Atlas:**

- Metrics: Database performance
- Collections: View your data
- Alerts: Set up monitoring alerts

### Custom Domain (Optional)

1. Render Dashboard → dsofts-server → Settings → Custom Domain
2. Add your domain: `api.yourdomain.com`
3. Update DNS records:
   ```
   Type: CNAME
   Name: api
   Value: dsofts-server.onrender.com
   ```
4. SSL certificate: Automatic via Let's Encrypt

### Continuous Deployment

Every push to GitHub main branch will auto-deploy:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys new version
# 4. Zero-downtime deployment
```

## 🐛 Troubleshooting

### Deployment Failed

- Check Render logs for errors
- Verify all environment variables are set
- Check build command output

### Database Connection Error

- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify database user credentials

### CORS Errors

- Update CLIENT_URL environment variable
- Set to `*` for testing, specific URL for production

### Render Free Tier Sleep

- Free tier sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds
- Keep-alive services available (or upgrade to paid)

## 📊 Deployment Summary

**Repository:**

- GitHub: https://github.com/dsofts/dsofts-server
- Branch: main

**Deployment:**

- Platform: Render
- URL: https://dsofts-server.onrender.com
- Plan: Free (750 hours/month)

**Database:**

- Platform: MongoDB Atlas
- Cluster: dsofts-cluster
- Database: dsofts
- Plan: Free (512 MB storage)

**Environment:**

- Node.js: Latest LTS
- Auto-deploy: Enabled
- SSL: Automatic

## 🎉 You're Live!

Your backend is now:
✅ Deployed on Render
✅ Connected to MongoDB Atlas
✅ Auto-deploying from GitHub
✅ SSL enabled
✅ Production-ready

**API Base URL:** https://dsofts-server.onrender.com

---

**Need help?** Check DEPLOYMENT.md for detailed instructions.
