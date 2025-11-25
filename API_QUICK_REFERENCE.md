# 🎯 Quick Reference - DSofts API Testing

## 🌐 Base URL

```
https://dsofts-server-bj3s.onrender.com
```

## 🔑 Test Credentials

### Admin

```
Email: rohan@dsofts.in
Password: Rohan123
```

### User

```
Email: john@example.com
Password: password123
```

## 🚀 Quick Test Flow

### 1. Health Check

```
GET /
```

### 2. Login as Admin

```
POST /api/auth/login
{
  "email": "rohan@dsofts.in",
  "password": "Rohan123"
}
```

**Copy the `token` from response**

### 3. Create Portfolio Project (Admin)

```
POST /api/admin/projects
Authorization: Bearer YOUR_TOKEN

{
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "thumbnailImageUrl": "https://images.unsplash.com/photo-1557821552-17105176677c",
  "bannerImageUrl": "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
  "shortDescription": "Modern e-commerce solution",
  "fullDescription": "A complete e-commerce platform...",
  "techStack": ["React", "Node.js", "MongoDB"],
  "clientName": "ABC Corp",
  "websiteUrl": "https://client-ecommerce.example.com",
  "clientRating": 4.8,
  "completedAt": "2025-01-15T00:00:00.000Z",
  "isFeatured": true
}
```

### 4. View Projects (Public)

```
GET /api/projects
```

### 5. Create Service (Admin)

```
POST /api/services
Authorization: Bearer YOUR_TOKEN

{
  "title": "Full-Stack Web Development",
  "description": "End-to-end web application development",
  "startingPrice": 2500,
  "features": [
    "Responsive UI/UX Design",
    "RESTful API Development",
    "Database Design & Integration"
  ],
  "isPopular": true
}
```

### 6. Login as User

```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 7. Create Client Project (User)

```
POST /api/client-projects
Authorization: Bearer YOUR_TOKEN

{
  "projectTitle": "Custom CRM System",
  "projectDescription": "I need a custom CRM system...",
  "estimatedBudget": 5000
}
```

### 8. View My Projects (User)

```
GET /api/client-projects
Authorization: Bearer YOUR_TOKEN
```

### 9. View All Client Projects (Admin)

```
GET /api/admin/client-projects
Authorization: Bearer ADMIN_TOKEN
```

### 10. Update Project Status (Admin)

```
PUT /api/admin/client-projects/:id
Authorization: Bearer ADMIN_TOKEN

{
  "status": "in_progress",
  "notesFromAdmin": "Started development"
}
```

## 📋 All Endpoints

### Public (No Auth)

- `GET /` - Health check
- `GET /api/projects` - All portfolio projects
- `GET /api/projects/:slug` - Project by slug
- `GET /api/services` - All services
- `POST /api/contact` - Submit contact message
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### User (Auth Required)

- `GET /api/auth/me` - Current user
- `POST /api/client-projects` - Create project request
- `GET /api/client-projects` - My projects
- `GET /api/client-projects/:id` - Project details

### Admin Only

- `POST /api/admin/projects` - Create portfolio project
- `PUT /api/admin/projects/:id` - Update portfolio project
- `DELETE /api/admin/projects/:id` - Delete portfolio project
- `GET /api/admin/client-projects` - All client projects
- `GET /api/admin/client-projects/:id` - Client project details
- `PUT /api/admin/client-projects/:id` - Update client project
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/contact` - All contact messages
- `GET /api/contact/:id` - Contact message details
- `DELETE /api/contact/:id` - Delete contact message

## 🎨 Status Values

- `new` - New project request
- `in_progress` - Under development
- `deployed` - Completed and live
- `cancelled` - Cancelled project

## 🔧 Common Headers

```
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE
```

## ⚡ Quick Tips

1. First request may take 30-60s (Render cold start)
2. Admin email must contain `@dsofts.com` or `@dsofts.in`
3. Tokens expire after 30 days
4. All dates in ISO 8601 format
5. IDs are MongoDB ObjectIds (24 hex characters)

## 📦 Import Postman Collection

File: `DSofts_API_Collection_Render.postman_collection.json`

---

**Full Guide**: See `POSTMAN_TESTING_GUIDE.md` for detailed instructions
