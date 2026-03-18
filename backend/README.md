🏋️ Gym Management System – Frontend--------------------------------------------------------

A modern Gym Management System frontend built using React + TypeScript, designed for managing members, trainers, workouts, and plans with a clean and scalable architecture.

🚀 Features
👨‍💼 Admin Features-----------------------------------------------------------

Manage Members (Add, Update, Delete)

Manage Trainers

Create & Manage Membership Plans

Assign Workouts to Members

Dashboard with insights & activity feed

🧑‍💻 Member Features

View Personal Dashboard

Today's Workout Plan

Track Workout Progress

View Membership Plans

Nutrition Guidance

Profile Management

⚙️ Core Functionalities--------------------------------------------------------------

Authentication & Protected Routes

Role-based Access (Admin / Member)

Activity Logging System

API Integration with Backend

Reusable Components & Modular Design

🏗️ Tech Stack

⚛️ React (Vite)

🟦 TypeScript

🎨 CSS (Custom Styling)

🔄 Axios (API Calls)

🧠 Context API + Redux Toolkit

🔐 JWT Authentication


src/
│
├── api/                # API service layer (Axios calls)
│   ├── authAPI.ts
│   ├── memberAPI.ts
│   ├── trainerAPI.ts
│   ├── planAPI.ts
│   ├── workoutAPI.ts
│   └── nutritionAPI.ts
│
├── components/         # Reusable UI components
│   ├── Navbar.tsx
│   ├── PlanCard.tsx
│   ├── ProtectedRoute.tsx
│   ├── ActivityFeed.tsx
│   ├── WeeklySummary.tsx
│   ├── WorkoutChart.tsx
│   └── WorkoutProgress.tsx
│
├── context/            # Global state using Context API
│   ├── AuthContext.tsx
│   └── ActivityContext.tsx
│
├── features/           # Feature-based modules
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── ManageMembers.tsx
│   │   ├── ManageTrainers.tsx
│   │   ├── ManagePlans.tsx
│   │   └── ManageWorkouts.tsx
│   │
│   └── member/
│       ├── MemberDashboard.tsx
│       ├── MyPlan.tsx
│       ├── NutritionPage.tsx
│       ├── Profile.tsx
│       └── WorkoutsPage.tsx
│
├── hooks/              # Custom hooks
│   ├── useActivity.ts
│   └── useSocket.ts
│
├── layouts/            # Layout components
│   ├── MainLayout.tsx
│   └── DashboardLayout.tsx
│
├── pages/              # Route-level pages
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Plans.tsx
│   └── PlanPreview.tsx
│
├── redux/              # Redux store
│   ├── store.ts
│   └── slices/authSlice.ts
│
├── routes/             # Routing configuration
│   ├── AppRoutes.tsx
│   └── RoleRoute.tsx
│
├── types/              # TypeScript types
│   └── member.ts
│
├── utils/              # Utility functions
│   ├── activityLogger.ts
│   └── pageTracker.ts
│
├── App.tsx
├── main.tsx
└── index.css


# Clone the repo
git clone https://github.com/your-username/gym-management-system.git

# Navigate to frontend
cd gym-management-system-frontend/frontend

# Install dependencies
npm install

# Start development server
npm run dev

🔐 Authentication Flow---------------------

JWT-based authentication

Token stored securely (localStorage/context)

Protected routes using ProtectedRoute.tsx

Role-based routing with RoleRoute.tsx

📊 Activity Logging------------------------

The system tracks key actions:

Trainer created

Plan added

Workout assigned

Member activity

Handled via:

utils/activityLogger.ts
context/ActivityContext.tsx
📈 Future Improvements----------------------

AI-based workout recommendations

Real-time notifications (WebSockets)

Advanced analytics dashboard

Mobile responsive enhancements

🤝 Contributing-------------------------

Feel free to fork this repo and contribute 🚀

📜 License--------------------------------

This project is licensed under the MIT License.
