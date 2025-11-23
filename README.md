# DSofts IT Services - Backend API

A complete, production-ready RESTful API backend for DSofts IT Services built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (User/Admin)
- **Portfolio Management**: CRUD operations for showcasing portfolio projects
- **Client Project Management**: Users can submit project requests, admins can manage them
- **Services Management**: Admin-controlled service offerings
- **Contact Form**: Public contact form with admin management
- **Secure**: Password hashing with bcrypt, JWT token validation
- **Error Handling**: Centralized error handling with detailed error messages
- **Validation**: Mongoose schema validation for data integrity

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                          # Database connection
├── controllers/
│   ├── authController.js              # Authentication logic
│   ├── portfolioProjectController.js  # Portfolio projects
│   ├── clientProjectController.js     # User client projects
│   ├── adminClientProjectController.js # Admin client project management
│   ├── serviceController.js           # Services
│   └── contactController.js           # Contact messages
├── middleware/
│   ├── authMiddleware.js              # JWT authentication
│   ├── roleMiddleware.js              # Role-based authorization
│   └── errorHandler.js                # Error handling
├── models/
│   ├── User.js                        # User schema
│   ├── PortfolioProject.js            # Portfolio project schema
│   ├── ClientProject.js               # Client project schema
│   ├── Service.js                     # Service schema
│   └── ContactMessage.js              # Contact message schema
├── routes/
│   ├── authRoutes.js                  # Auth routes
│   ├── portfolioProjectRoutes.js      # Public portfolio routes
│   ├── adminPortfolioProjectRoutes.js # Admin portfolio routes
│   ├── clientProjectRoutes.js         # User client project routes
│   ├── adminClientProjectRoutes.js    # Admin client project routes
│   ├── serviceRoutes.js               # Service routes
│   └── contactRoutes.js               # Contact routes
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore file
├── package.json                       # Dependencies
└── server.js                          # Entry point
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **CORS**: cors
- **Environment Variables**: dotenv
- **Logging**: morgan
- **Development**: nodemon

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dsofts
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**

   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user profile |

### Portfolio Projects (Public)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/projects` | Public | Get all projects (supports ?featured=true&limit=10) |
| GET | `/api/projects/:slug` | Public | Get single project by slug |

### Portfolio Projects (Admin)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/projects` | Admin | Create new portfolio project |
| PUT | `/api/admin/projects/:id` | Admin | Update portfolio project |
| DELETE | `/api/admin/projects/:id` | Admin | Delete portfolio project |

### Client Projects (User)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/client-projects` | User/Admin | Create new client project |
| GET | `/api/client-projects` | User/Admin | Get user's client projects |
| GET | `/api/client-projects/:id` | User/Admin | Get single client project |

### Client Projects (Admin)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/client-projects` | Admin | Get all client projects (supports ?status=new) |
| GET | `/api/admin/client-projects/:id` | Admin | Get single client project |
| PUT | `/api/admin/client-projects/:id` | Admin | Update client project status/deployment |

### Services

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/services` | Public | Get all services |
| POST | `/api/services` | Admin | Create new service |
| PUT | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |

### Contact

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact message |
| GET | `/api/contact` | Admin | Get all contact messages |
| GET | `/api/contact/:id` | Admin | Get single contact message |
| DELETE | `/api/contact/:id` | Admin | Delete contact message |

## 📝 Request/Response Examples

### Signup

**Request:**
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

**Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Portfolio Project (Admin)

**Request:**
```json
POST /api/admin/projects
Authorization: Bearer <token>
{
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "thumbnailImageUrl": "https://example.com/thumb.jpg",
  "bannerImageUrl": "https://example.com/banner.jpg",
  "shortDescription": "Modern e-commerce solution",
  "fullDescription": "Complete e-commerce platform with payment integration...",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe"],
  "clientName": "ABC Corp",
  "clientRating": 4.8,
  "completedAt": "2025-01-15T00:00:00.000Z",
  "isFeatured": true
}
```

### Create Client Project (User)

**Request:**
```json
POST /api/client-projects
Authorization: Bearer <token>
{
  "projectTitle": "Custom CRM System",
  "projectDescription": "Need a CRM system for managing customer relationships",
  "estimatedBudget": 5000,
  "referencePortfolioProjectId": "507f1f77bcf86cd799439011"
}
```

### Update Client Project Status (Admin)

**Request:**
```json
PUT /api/admin/client-projects/:id
Authorization: Bearer <token>
{
  "status": "in_progress",
  "notesFromAdmin": "Started development, expected completion in 2 weeks",
  "deploymentUrl": ""
}
```

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **user**: Can create and view their own client projects
- **admin**: Full access to all endpoints, can manage all resources

## 🗄️ Database Models

### User
- name, email, passwordHash, role, createdAt

### PortfolioProject
- title, slug, thumbnailImageUrl, bannerImageUrl, shortDescription, fullDescription, techStack, clientName, clientRating, completedAt, isFeatured, createdAt, updatedAt

### ClientProject
- userId, referencePortfolioProjectId, projectTitle, projectDescription, estimatedBudget, status, deploymentUrl, notesFromAdmin, createdAt, updatedAt

### Service
- title, description, startingPrice, features, isPopular, createdAt, updatedAt

### ContactMessage
- name, email, message, budget, timeline, createdAt

## 🧪 Testing

You can test the API using:
- **Postman**: Import the provided Postman collection
- **cURL**: Use command-line requests
- **Thunder Client**: VS Code extension

## 🚨 Error Handling

The API uses centralized error handling with appropriate HTTP status codes:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

## 🔒 Security Best Practices

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens expire after 7 days (configurable)
- CORS is configured to allow specific origins
- Input validation using Mongoose schemas
- Role-based access control for admin routes

## 📄 License

ISC

## 👨‍💻 Author

DSofts IT Services

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**
