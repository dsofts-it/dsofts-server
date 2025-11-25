# 📮 Postman Testing Guide - DSofts API (Render Deployment)

## 🚀 Quick Start

### Import the Collection

1. Open Postman
2. Click **Import** button
3. Select the file: `DSofts_API_Collection_Render.postman_collection.json`
4. The collection will be imported with all endpoints ready to test

### Base URL

```
https://dsofts-server-bj3s.onrender.com
```

---

## 🔑 Test Credentials

### Admin User

- **Email**: `rohan@dsofts.in`
- **Password**: `Rohan123`
- **Role**: Admin (can access all endpoints)

### Regular User

- **Email**: `john@example.com`
- **Password**: `password123`
- **Role**: User (limited access)

> **Note**: If these users don't exist yet, use the signup endpoints to create them first.

---

## 📋 Testing Workflow

### Step 1: Health Check ✅

Start by verifying the API is running:

- **Request**: `GET /`
- **Expected Response**:

```json
{
  "message": "🚀 DSofts IT Services API",
  "version": "1.0.0",
  "status": "running",
  "timestamp": "2025-11-23T08:12:09.000Z"
}
```

### Step 2: Authentication 🔐

#### Option A: Signup (Create New User)

1. Use **"Signup - Regular User"** or **"Signup - Admin User"**
2. The auth token will be automatically saved to `{{authToken}}` variable
3. You're now authenticated for subsequent requests

#### Option B: Login (Existing User)

1. Use **"Login - Regular User"** or **"Login - Admin User"**
2. The auth token will be automatically saved to `{{authToken}}` variable

#### Verify Authentication

- Use **"Get Current User"** to verify your token is working
- Should return your user details

### Step 3: Test Public Endpoints 🌐

These don't require authentication:

1. **Get All Projects** - View all portfolio projects
2. **Get Featured Projects** - View only featured projects
3. **Get All Services** - View all services
4. **Submit Contact Message** - Submit a contact form

### Step 4: Test User Endpoints 👤

Requires user authentication (login as regular user):

1. **Create Client Project** - Submit a project request
2. **Get My Client Projects** - View your own projects
3. **Get Client Project by ID** - View specific project details

### Step 5: Test Admin Endpoints 🔧

Requires admin authentication (login as admin):

#### Portfolio Projects Management

1. **Create Portfolio Project** - Add new portfolio project
2. **Update Portfolio Project** - Modify existing project
3. **Delete Portfolio Project** - Remove a project

#### Client Projects Management

1. **Get All Client Projects** - View all client requests
2. **Get Client Projects by Status** - Filter by status (new, in_progress, deployed, cancelled)
3. **Update Client Project Status** - Change project status
4. **Mark Project as Deployed** - Mark as completed with deployment URL

#### Services Management

1. **Create Service** - Add new service offering
2. **Update Service** - Modify existing service
3. **Delete Service** - Remove a service

#### Contact Messages

1. **Get All Contact Messages** - View all contact submissions
2. **Get Contact Message by ID** - View specific message
3. **Delete Contact Message** - Remove a message

---

## 🔄 Automatic Variable Capture

The collection automatically captures and saves these variables:

| Variable          | Description                       | Captured From            |
| ----------------- | --------------------------------- | ------------------------ |
| `authToken`       | JWT authentication token          | Login/Signup responses   |
| `userId`          | Current user ID                   | Login/Signup responses   |
| `projectId`       | Last created portfolio project ID | Create Portfolio Project |
| `clientProjectId` | Last created client project ID    | Create Client Project    |
| `serviceId`       | Last created service ID           | Create Service           |
| `contactId`       | Last submitted contact message ID | Submit Contact Message   |

These variables are used in subsequent requests automatically (e.g., `{{projectId}}`, `{{authToken}}`).

---

## 📊 API Endpoints Overview

### Authentication Endpoints

| Method | Endpoint           | Auth Required | Description               |
| ------ | ------------------ | ------------- | ------------------------- |
| POST   | `/api/auth/signup` | No            | Create new user account   |
| POST   | `/api/auth/login`  | No            | Login to existing account |
| GET    | `/api/auth/me`     | Yes           | Get current user details  |

### Portfolio Projects (Public)

| Method | Endpoint                      | Auth Required | Description                    |
| ------ | ----------------------------- | ------------- | ------------------------------ |
| GET    | `/api/projects`               | No            | Get all portfolio projects     |
| GET    | `/api/projects?featured=true` | No            | Get featured projects only     |
| GET    | `/api/projects?limit=5`       | No            | Get limited number of projects |
| GET    | `/api/projects/:slug`         | No            | Get project by slug            |

### Portfolio Projects (Admin)

| Method | Endpoint                  | Auth Required | Description              |
| ------ | ------------------------- | ------------- | ------------------------ |
| POST   | `/api/admin/projects`     | Admin         | Create portfolio project |
| PUT    | `/api/admin/projects/:id` | Admin         | Update portfolio project |
| DELETE | `/api/admin/projects/:id` | Admin         | Delete portfolio project |

### Client Projects (User)

| Method | Endpoint                   | Auth Required | Description                   |
| ------ | -------------------------- | ------------- | ----------------------------- |
| POST   | `/api/client-projects`     | User          | Create client project request |
| GET    | `/api/client-projects`     | User          | Get my client projects        |
| GET    | `/api/client-projects/:id` | User          | Get specific client project   |

### Client Projects (Admin)

| Method | Endpoint                                | Auth Required | Description             |
| ------ | --------------------------------------- | ------------- | ----------------------- |
| GET    | `/api/admin/client-projects`            | Admin         | Get all client projects |
| GET    | `/api/admin/client-projects?status=new` | Admin         | Filter by status        |
| GET    | `/api/admin/client-projects/:id`        | Admin         | Get project details     |
| PUT    | `/api/admin/client-projects/:id`        | Admin         | Update project status   |

### Services

| Method | Endpoint            | Auth Required | Description      |
| ------ | ------------------- | ------------- | ---------------- |
| GET    | `/api/services`     | No            | Get all services |
| POST   | `/api/services`     | Admin         | Create service   |
| PUT    | `/api/services/:id` | Admin         | Update service   |
| DELETE | `/api/services/:id` | Admin         | Delete service   |

### Contact

| Method | Endpoint           | Auth Required | Description              |
| ------ | ------------------ | ------------- | ------------------------ |
| POST   | `/api/contact`     | No            | Submit contact message   |
| GET    | `/api/contact`     | Admin         | Get all contact messages |
| GET    | `/api/contact/:id` | Admin         | Get specific message     |
| DELETE | `/api/contact/:id` | Admin         | Delete message           |

---

## 🎯 Common Testing Scenarios

### Scenario 1: Complete User Journey

1. ✅ Health Check
2. 🔐 Signup as regular user
3. 📁 View portfolio projects (public)
4. 🛠️ View services (public)
5. 📝 Create a client project request
6. 👀 View my client projects
7. 📧 Submit contact message

### Scenario 2: Admin Management

1. ✅ Health Check
2. 🔐 Login as admin
3. ➕ Create portfolio project
4. ➕ Create service
5. 📋 View all client project requests
6. 🔄 Update client project status to "in_progress"
7. ✅ Mark client project as "deployed"
8. 📧 View all contact messages

### Scenario 3: Project Status Workflow

1. Login as **regular user**
2. Create client project (status: "new")
3. Logout and login as **admin**
4. Get all client projects (filter by status=new)
5. Update project status to "in_progress" with admin notes
6. Update project status to "deployed" with deployment URL
7. Logout and login as **regular user**
8. View my projects to see updated status

---

## 🐛 Troubleshooting

### Issue: "Unauthorized" or "No token provided"

**Solution**: Make sure you've logged in first. The `{{authToken}}` variable should be populated.

### Issue: "Access denied. Admin only"

**Solution**: You need to login with an admin account (email must contain `@dsofts.com` or `@dsofts.in`).

### Issue: "User already exists"

**Solution**: Use the login endpoint instead of signup, or use a different email.

### Issue: "Invalid credentials"

**Solution**: Check your email and password. Make sure you're using the correct test credentials.

### Issue: "Project not found" or "Resource not found"

**Solution**: Make sure the ID variable is set. Create a resource first, and the ID will be automatically captured.

### Issue: API is slow or timing out

**Solution**: Render free tier may sleep after inactivity. The first request might take 30-60 seconds to wake up the server.

---

## 📝 Sample Request Bodies

### Create Portfolio Project

```json
{
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "thumbnailImageUrl": "https://images.unsplash.com/photo-1557821552-17105176677c",
  "bannerImageUrl": "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
  "shortDescription": "Modern e-commerce solution with payment integration",
  "fullDescription": "A complete e-commerce platform built with React and Node.js...",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
  "clientName": "ABC Corporation",
  "websiteUrl": "https://client-ecommerce.example.com",
  "clientRating": 4.8,
  "completedAt": "2025-01-15T00:00:00.000Z",
  "isFeatured": true
}
```

### Create Client Project

```json
{
  "projectTitle": "Custom CRM System",
  "projectDescription": "I need a custom CRM system for managing customer relationships...",
  "estimatedBudget": 5000,
  "referencePortfolioProjectId": "{{projectId}}"
}
```

### Create Service

```json
{
  "title": "Full-Stack Web Development",
  "description": "End-to-end web application development with modern technologies...",
  "startingPrice": 2500,
  "features": [
    "Responsive UI/UX Design",
    "RESTful API Development",
    "Database Design & Integration",
    "Authentication & Authorization",
    "Cloud Deployment",
    "3 Months Free Support"
  ],
  "isPopular": true
}
```

### Submit Contact Message

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'm interested in your web development services...",
  "budget": 3000,
  "timeline": "2-3 months"
}
```

### Update Client Project Status

```json
{
  "status": "in_progress",
  "notesFromAdmin": "Started development. Expected completion in 2 weeks."
}
```

### Mark Project as Deployed

```json
{
  "status": "deployed",
  "deploymentUrl": "https://client-crm.example.com",
  "notesFromAdmin": "Project successfully deployed and handed over to client."
}
```

---

## 🎨 Status Values

### Client Project Status

- `new` - Newly submitted project request
- `in_progress` - Project is being developed
- `deployed` - Project is completed and deployed
- `cancelled` - Project was cancelled

---

## 💡 Tips

1. **Use the Collection Runner**: Run all requests in sequence to test the entire API
2. **Check Console Logs**: The collection includes console.log statements for debugging
3. **Save Responses**: Save example responses for documentation
4. **Environment Variables**: Consider creating separate environments for dev/staging/production
5. **Test Scripts**: The collection includes test scripts that automatically capture IDs

---

## 📞 Support

If you encounter any issues:

1. Check the API logs on Render dashboard
2. Verify your MongoDB connection is working
3. Ensure environment variables are set correctly on Render
4. Check CORS settings if testing from a browser

---

## 🔗 Related Files

- **Collection**: `DSofts_API_Collection_Render.postman_collection.json`
- **API Documentation**: `README.md`
- **Deployment Checklist**: `DEPLOYMENT_CHECKLIST.md`

---

**Happy Testing! 🚀**
