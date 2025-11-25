# 🚀 Quick Start Guide - DSofts Backend

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.example` to `.env` (or run `setup.bat`):
```bash
cp .env.example .env
```

### 3. Update MongoDB URI
Edit `.env` and update `MONGO_URI`:

**Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/dsofts
```

**MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsofts?retryWrites=true&w=majority
```

### 4. Start Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

## 🧪 Test the API

### Option 1: Browser
Visit: http://localhost:5000

### Option 2: Postman
1. Import `DSofts_API_Collection.postman_collection.json`
2. Run "Health Check" request
3. Run "Signup" to create a user
4. Run "Login" to get auth token

### Option 3: cURL
```bash
curl http://localhost:5000
```

## 👤 Create Admin User

### Method 1: Using Script
```bash
# First, signup a user via API
# Then run:
node makeAdmin.js rohan@dsofts.in
```

### Method 2: MongoDB Compass
```javascript
db.users.updateOne(
  { email: "rohan@dsofts.in" },
  { $set: { role: "admin" } }
)
```

## 📝 First API Calls

### 1. Signup
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the `token` from response.

### 3. Get Profile
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📂 Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── middleware/      # Auth, roles, error handling
├── models/          # MongoDB schemas
├── routes/          # API routes
├── server.js        # Entry point
├── package.json     # Dependencies
└── .env            # Environment variables
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection | mongodb://localhost:27017/dsofts |
| JWT_SECRET | Secret for JWT | your_secret_key |
| JWT_EXPIRES_IN | Token expiry | 7d |
| CLIENT_URL | Frontend URL | http://localhost:3000 |

## 📚 API Endpoints Summary

### Public Routes
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/projects` - List portfolio projects
- `GET /api/projects/:slug` - Get project details
- `GET /api/services` - List services
- `POST /api/contact` - Submit contact form

### User Routes (Auth Required)
- `GET /api/auth/me` - Get profile
- `POST /api/client-projects` - Submit project
- `GET /api/client-projects` - My projects

### Admin Routes (Auth + Admin Role)
- `POST /api/admin/projects` - Create portfolio project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/client-projects` - All client projects
- `PUT /api/admin/client-projects/:id` - Update status
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ Error connecting to MongoDB
```
**Fix:** 
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Fix:**
- Change PORT in `.env` to 5001
- Or kill process using port 5000

### JWT Error
```
401 Unauthorized - Invalid token
```
**Fix:**
- Get new token by logging in
- Check Authorization header format: `Bearer <token>`

### Module Not Found
```
Error: Cannot find module 'express'
```
**Fix:**
```bash
npm install
```

## 📖 Documentation

- **Full API Docs:** See `README.md`
- **Testing Guide:** See `API_TESTING_GUIDE.md`
- **Postman Collection:** `DSofts_API_Collection.postman_collection.json`

## 🎯 Next Steps

1. ✅ Test all endpoints with Postman
2. ✅ Create admin user
3. ✅ Add sample portfolio projects
4. ✅ Add services
5. ✅ Integrate with frontend
6. ✅ Deploy to production

## 🚀 Production Deployment

### Heroku
```bash
heroku create dsofts-backend
heroku config:set MONGO_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Render / Railway
1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
CLIENT_URL=https://yourdomain.com
```

## 💡 Tips

- Use **MongoDB Atlas** for cloud database (free tier available)
- Use **Postman** for API testing
- Use **MongoDB Compass** for database GUI
- Keep `.env` file secure (never commit to git)
- Change JWT_SECRET in production

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Check `API_TESTING_GUIDE.md` for testing examples
- Review error messages in console
- Check MongoDB connection
- Verify environment variables

---

**You're all set! Happy coding! 🎉**
