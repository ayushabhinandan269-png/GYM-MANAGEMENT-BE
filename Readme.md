🏋️ Gym Management System – Backend

LIVE LINK - https://gym-management-be-1.onrender.com/

1. 📌 Backend Overview

The backend of this Gym Management System is built with a scalable and modular architecture using Node.js and TypeScript. It handles all core operations such as authentication, member and trainer management, workout assignments, and real-time activity tracking.

It follows a clean separation of concerns with controllers, models, routes, and middleware, making it easy to maintain and extend. The system also supports real-time communication using Socket.IO, enabling live updates such as activity logs and system events.

Security is ensured through JWT-based authentication and role-based access control, allowing different permissions for admins and members.

2. 🚀 Features

Admin Functionalities

Manage Members, Trainers, and Plans

Assign Workouts to Members

Access Dashboard Analytics

Monitor system activities

Member Functionalities

Secure Authentication & Profile Management

View Assigned Workouts

Track Workout Progress

Access Nutrition Plans

Core Backend Features

RESTful API Architecture

JWT Authentication & Authorization

Role-Based Access Control (RBAC)

Real-time updates using Socket.IO

Centralized Error Handling

Request Validation System

3. 🏗️ Tech Stack

Node.js

Express.js

TypeScript

MongoDB (Mongoose)

JWT Authentication

Socket.IO

dotenv

4. 📁 Folder Structure

backend/
│
├── src/
│   ├── config/                # DB & app configuration
│   │   └── db.ts
│   │
│   ├── controllers/           # Business logic
│   │   ├── adminController.ts
│   │   ├── authController.ts
│   │   ├── dashboardController.ts
│   │   ├── memberController.ts
│   │   ├── membershipController.ts
│   │   ├── nutritionController.ts
│   │   ├── planController.ts
│   │   ├── progressController.ts
│   │   ├── trainerController.ts
│   │   └── workoutController.ts
│   │
│   ├── middleware/            # Custom middlewares
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   │
│   ├── models/                # Mongoose models
│   │   ├── User.ts
│   │   ├── Trainer.ts
│   │   ├── Plan.ts
│   │   ├── Membership.ts
│   │   ├── Workout.ts
│   │   ├── WorkoutProgress.ts
│   │   └── Nutrition.ts
│   │
│   ├── routes/                # API routes
│   │   ├── authRoutes.ts
│   │   ├── adminRoutes.ts
│   │   ├── dashboardRoutes.ts
│   │   ├── memberRoutes.ts
│   │   ├── membershipRoutes.ts
│   │   ├── nutritionRoutes.ts
│   │   ├── planRoutes.ts
│   │   ├── progressRoutes.ts
│   │   ├── trainerRoutes.ts
│   │   └── workoutRoutes.ts
│   │
│   ├── validators/            # Request validation logic
│   │   └── memberValidator.ts
│   │
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
│
├── .env
├── package.json
├── tsconfig.json
└── .gitignore

# Clone the repository
git clone https://github.com/your-username/gym-management-system.git

# Navigate to backend
cd gym-management-system/backend

# Install dependencies
npm install

# Start development server
npm run dev



6. 🔐 Authentication & Authorization

JWT-based authentication

Token validation using authMiddleware

Role-based access using roleMiddleware

Protected routes for Admin and Member

7. 🔌 Real-time Features

Socket.IO integrated

Real-time updates for activities

Client connection tracking

Useful for notifications and live updates

8. ⚠️ Error Handling & Validation

Centralized error handling using errorHandler middleware

Request validation using validators

Clean API responses with proper status codes

9. 📈 Future Improvements

AI-based workout & diet recommendations

Payment gateway integration

Advanced analytics dashboard

Email/SMS notifications

Multi-gym support

10. 📜 License

This project is licensed under the MIT License


