# DSofts API Testing Guide

This guide will help you test all the APIs using the provided Postman collection.

## Prerequisites

1. **MongoDB** running locally or a MongoDB Atlas connection string
2. **Node.js** installed (v14 or higher)
3. **Postman** installed (or any API testing tool)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

Or use the setup script:
```bash
setup.bat
```

### 2. Configure Environment Variables

Update the `.env` file with your configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsofts
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
📊 Database Name: dsofts
🚀 Server running on port 5000
```

## Import Postman Collection

1. Open Postman
2. Click **Import** button
3. Select `DSofts_API_Collection.postman_collection.json`
4. The collection will be imported with all endpoints organized in folders

## Testing Workflow

### Step 1: Health Check

**Endpoint:** `GET /`

Test if the server is running:
- Should return status 200
- Response: API information and status

### Step 2: User Signup

**Endpoint:** `POST /api/auth/signup`

Create a regular user account:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Note:** The Postman collection automatically saves the token to `{{authToken}}` variable.

### Step 3: Create Admin User

**Option A: Signup and Promote**

1. Create a user via signup
2. Use the `makeAdmin.js` script:

```bash
node makeAdmin.js admin@dsofts.com
```

**Option B: Manually Update in MongoDB**

```javascript
db.users.updateOne(
  { email: "admin@dsofts.com" },
  { $set: { role: "admin" } }
)
```

### Step 4: Login

**Endpoint:** `POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 5: Test Protected Routes

**Get Current User**

**Endpoint:** `GET /api/auth/me`

Headers:
```
Authorization: Bearer {{authToken}}
```

This should return your user profile.

## Testing All Endpoints

### 1. Portfolio Projects (Public)

#### Get All Projects
```
GET /api/projects
```

#### Get Featured Projects Only
```
GET /api/projects?featured=true
```

#### Get Limited Projects
```
GET /api/projects?limit=5
```

#### Get Project by Slug
```
GET /api/projects/ecommerce-platform
```

### 2. Portfolio Projects (Admin Only)

**⚠️ Requires Admin Token**

#### Create Portfolio Project
```
POST /api/admin/projects
Authorization: Bearer {{authToken}}
```

Body:
```json
{
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "thumbnailImageUrl": "https://example.com/thumb.jpg",
  "bannerImageUrl": "https://example.com/banner.jpg",
  "shortDescription": "Modern e-commerce solution",
  "fullDescription": "Complete e-commerce platform...",
  "techStack": ["React", "Node.js", "MongoDB"],
  "clientName": "ABC Corp",
  "clientRating": 4.8,
  "completedAt": "2025-01-15T00:00:00.000Z",
  "isFeatured": true
}
```

#### Update Portfolio Project
```
PUT /api/admin/projects/:id
Authorization: Bearer {{authToken}}
```

#### Delete Portfolio Project
```
DELETE /api/admin/projects/:id
Authorization: Bearer {{authToken}}
```

### 3. Client Projects (User)

**⚠️ Requires User or Admin Token**

#### Create Client Project
```
POST /api/client-projects
Authorization: Bearer {{authToken}}
```

Body:
```json
{
  "projectTitle": "Custom CRM System",
  "projectDescription": "Need a CRM for managing customers...",
  "estimatedBudget": 5000,
  "referencePortfolioProjectId": "optional_project_id"
}
```

#### Get My Projects
```
GET /api/client-projects
Authorization: Bearer {{authToken}}
```

#### Get Specific Project
```
GET /api/client-projects/:id
Authorization: Bearer {{authToken}}
```

### 4. Client Projects (Admin)

**⚠️ Requires Admin Token**

#### Get All Client Projects
```
GET /api/admin/client-projects
Authorization: Bearer {{authToken}}
```

#### Filter by Status
```
GET /api/admin/client-projects?status=new
Authorization: Bearer {{authToken}}
```

Valid statuses: `new`, `in_discussion`, `in_progress`, `deployed`, `cancelled`

#### Update Project Status
```
PUT /api/admin/client-projects/:id
Authorization: Bearer {{authToken}}
```

Body:
```json
{
  "status": "in_progress",
  "notesFromAdmin": "Started development...",
  "deploymentUrl": ""
}
```

#### Mark as Deployed
```
PUT /api/admin/client-projects/:id
Authorization: Bearer {{authToken}}
```

Body:
```json
{
  "status": "deployed",
  "deploymentUrl": "https://client-app.com",
  "notesFromAdmin": "Successfully deployed!"
}
```

### 5. Services

#### Get All Services (Public)
```
GET /api/services
```

#### Create Service (Admin)
```
POST /api/services
Authorization: Bearer {{authToken}}
```

Body:
```json
{
  "title": "Full-Stack Web Development",
  "description": "End-to-end web app development",
  "startingPrice": 2500,
  "features": [
    "Responsive UI/UX",
    "REST API",
    "Database Design",
    "Cloud Deployment"
  ],
  "isPopular": true
}
```

#### Update Service (Admin)
```
PUT /api/services/:id
Authorization: Bearer {{authToken}}
```

#### Delete Service (Admin)
```
DELETE /api/services/:id
Authorization: Bearer {{authToken}}
```

### 6. Contact Messages

#### Submit Contact Form (Public)
```
POST /api/contact
```

Body:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'm interested in your services...",
  "budget": 3000,
  "timeline": "2-3 months"
}
```

#### Get All Messages (Admin)
```
GET /api/contact
Authorization: Bearer {{authToken}}
```

#### Get Single Message (Admin)
```
GET /api/contact/:id
Authorization: Bearer {{authToken}}
```

#### Delete Message (Admin)
```
DELETE /api/contact/:id
Authorization: Bearer {{authToken}}
```

## Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Validation error or missing fields
- **401 Unauthorized**: No token or invalid token
- **403 Forbidden**: Valid token but insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Testing Tips

### 1. Use Postman Variables

The collection uses these variables:
- `{{baseUrl}}`: http://localhost:5000
- `{{authToken}}`: Auto-saved after login/signup
- `{{projectId}}`: Auto-saved after creating portfolio project
- `{{clientProjectId}}`: Auto-saved after creating client project
- `{{serviceId}}`: Auto-saved after creating service

### 2. Test Order

Follow this order for best results:

1. **Health Check** → Verify server is running
2. **Signup** → Create user account
3. **Login** → Get auth token
4. **Get Me** → Verify authentication
5. **Create Admin** → Promote user to admin
6. **Test Admin Routes** → Create portfolio projects, services
7. **Test User Routes** → Create client projects
8. **Test Public Routes** → View projects, services

### 3. Error Testing

Test these scenarios:
- Login with wrong password
- Access admin routes with user token
- Create duplicate email
- Invalid MongoDB ObjectId
- Missing required fields

### 4. Database Inspection

Use MongoDB Compass or CLI to inspect:

```bash
mongosh
use dsofts
db.users.find()
db.portfolio_projects.find()
db.client_projects.find()
db.services.find()
db.contact_messages.find()
```

## Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 5000 is available

### Authentication errors
- Verify token is being sent in Authorization header
- Check token hasn't expired (default: 7 days)
- Ensure user exists in database

### 403 Forbidden errors
- Verify user has correct role (admin vs user)
- Check roleMiddleware is working correctly

### Database connection errors
- Verify MongoDB is running
- Check MONGO_URI in `.env`
- For MongoDB Atlas, check IP whitelist

## Sample Test Data

### Portfolio Project
```json
{
  "title": "Mobile Banking App",
  "slug": "mobile-banking-app",
  "thumbnailImageUrl": "https://images.unsplash.com/photo-1563986768609-322da13575f3",
  "bannerImageUrl": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
  "shortDescription": "Secure mobile banking application",
  "fullDescription": "A comprehensive mobile banking solution with biometric authentication, real-time transactions, and advanced security features.",
  "techStack": ["React Native", "Node.js", "PostgreSQL", "AWS"],
  "clientName": "XYZ Bank",
  "clientRating": 4.9,
  "completedAt": "2024-12-01T00:00:00.000Z",
  "isFeatured": true
}
```

### Service
```json
{
  "title": "Mobile App Development",
  "description": "Native and cross-platform mobile app development for iOS and Android",
  "startingPrice": 3500,
  "features": [
    "iOS & Android Development",
    "Cross-platform with React Native",
    "App Store Deployment",
    "Push Notifications",
    "In-app Purchases",
    "6 Months Support"
  ],
  "isPopular": true
}
```

## Next Steps

After testing all endpoints:

1. **Frontend Integration**: Use these APIs in your React/Vue/Angular frontend
2. **Production Deployment**: Deploy to Heroku, AWS, or DigitalOcean
3. **Add Features**: File uploads, email notifications, analytics
4. **Security**: Rate limiting, input sanitization, HTTPS

---

**Happy Testing! 🚀**

For issues or questions, refer to the README.md file.
