# Nondan Backend

A comprehensive backend API for the Nondan event management platform built with Node.js, Express.js, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Development](#development)
- [Contributing](#contributing)

## ✨ Features

- **User Management**: Complete authentication system with JWT tokens
- **Event Management**: CRUD operations for events with registration capabilities
- **Club Management**: Club creation, membership management, and role-based access
- **AI Integration**: AI-powered features using Google's Generative AI
- **Role-based Access Control**: Admin and student role management
- **Secure Authentication**: Password hashing with bcrypt and JWT tokens
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **AI Integration**: Google Generative AI
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tritonir/nondan_backend.git
   cd nondan_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start running on the port specified in your environment variables.

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nondan
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nondan

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key

# CORS
ALLOWED_ORIGIN=http://localhost:3000

# Google AI (Optional)
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "student"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### User Endpoints

#### GET `/api/users/profile`
Get user profile (Protected)

#### PUT `/api/users/profile`
Update user profile (Protected)

### Event Endpoints

#### GET `/api/events`
Get all events
- Query params: `category`, `status`, `limit`, `page`

#### GET `/api/events/:id`
Get event by ID

#### POST `/api/events`
Create new event (Admin only)
```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "date": "2024-12-15T10:00:00Z",
  "location": "Main Auditorium",
  "category": "Technology",
  "maxAttendees": 200
}
```

#### PUT `/api/events/:id`
Update event (Admin only)

#### DELETE `/api/events/:id`
Delete event (Admin only)

#### POST `/api/events/:id/register`
Register for event (Protected)

#### DELETE `/api/events/:id/unregister`
Unregister from event (Protected)

### Club Endpoints

#### GET `/api/clubs`
Get all clubs

#### GET `/api/clubs/:id`
Get club by ID

#### POST `/api/clubs`
Create new club (Admin only)

#### PUT `/api/clubs/:id`
Update club (Admin only)

#### POST `/api/clubs/:id/join`
Join club (Protected)

#### DELETE `/api/clubs/:id/leave`
Leave club (Protected)

### AI Endpoints

#### POST `/api/ai/chat`
Chat with AI assistant (Protected)
```json
{
  "message": "Tell me about upcoming tech events"
}
```

## 📁 Project Structure

```
nondan_backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── aicontroller.js       # AI-related business logic
│   ├── club.controller.js    # Club management logic
│   ├── event.controller.js   # Event management logic
│   └── user.controller.js    # User management logic
├── middlewares/
│   ├── club.middleware.js    # Club-related middleware
│   └── user.middleware.js    # Authentication & authorization
├── models/
│   ├── club.model.js         # Club data model
│   ├── event.model.js        # Event data model
│   └── user.model.js         # User data model
├── routes/
│   ├── ai.js                 # AI endpoint routes
│   ├── club.route.js         # Club endpoint routes
│   ├── event.route.js        # Event endpoint routes
│   ├── root.js               # Main router
│   └── user.route.js         # User endpoint routes
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── index.js                  # Application entry point
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🗄 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['student', 'admin']),
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
{
  title: String,
  description: String,
  date: Date,
  location: String,
  category: String,
  status: String (enum: ['upcoming', 'ongoing', 'completed']),
  maxAttendees: Number,
  attendees: [ObjectId],
  club: ObjectId,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Club Model
```javascript
{
  name: String,
  description: String,
  category: String,
  members: [ObjectId],
  admins: [ObjectId],
  events: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Protected Routes
- All user profile operations
- Event registration/unregistration
- Club join/leave operations
- Admin-only operations (event/club creation, editing, deletion)

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Development Guidelines

1. **Code Style**: Follow ES6+ standards
2. **Error Handling**: Use try-catch blocks and proper error responses
3. **Validation**: Validate all input data in controllers
4. **Security**: Always hash passwords and validate JWT tokens
5. **Documentation**: Comment complex business logic

### Adding New Features

1. Create the model in `/models/`
2. Add controller logic in `/controllers/`
3. Create routes in `/routes/`
4. Add middleware if needed in `/middlewares/`
5. Update this documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This is a development version. Make sure to update security configurations and environment variables for production deployment.

