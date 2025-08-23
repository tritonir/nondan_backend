# Nondan Backend

![Nondan Cover](./cover.png)

## 🎨 **Design**: [View on Figma](https://www.figma.com/design/TGEWoiUVvVJb5KE59obG7K/Nondan---Event-Management-Platform)

A comprehensive backend API for the Nondan event management platform built with Node.js, Express.js, and MongoDB.

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

#### POST `/api/auth/login`
Login user

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
├── index.js                  # Application entry point
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🗄 Database Models

### User Model
- User authentication and profile information
- Role-based access control (student/admin)
- Password hashing and JWT token management

### Event Model
- Event details with date, location, and capacity
- Registration system with attendee tracking
- Status management (upcoming/ongoing/completed)

### Club Model
- Club information and membership management
- Admin and member role assignments
- Event association and organization

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

## 📞 Support

For support, email hello@nondan.com or create an issue in the repository.

---

**Note**: This is a development version. Make sure to update security configurations and environment variables for production deployment.
