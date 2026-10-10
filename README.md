# Daylight — Habit Tracking Application

A clean, responsive MERN project for tracking daily habits and building routines a little at a time.

## Features

- React dashboard with daily progress, streaks, a weekly overview, and habit check-offs.
- Working Overview, My habits, Insights, and Settings views with live sidebar navigation and habit search.
- Create, edit, archive, delete, and check off habits; set a target and frequency.
- Account settings let signed-in users update their name, email, and password.
- Express REST API backed by MongoDB and Mongoose for user accounts, habits, and dated completions.
- JWT authentication, bcrypt password hashing, per-user data ownership, and user/admin roles.
- Habit archive support, configurable targets, frequency, units, and category.
- A welcoming UI that works on desktop, tablet, and mobile.

## Run locally

Requirements: Node.js 20+ and a running MongoDB instance (local or MongoDB Atlas).

1. Copy `.env.example` to `server/.env` and set a private, long `JWT_SECRET` and your MongoDB connection string.
2. From the project root, install dependencies: `npm install` and `npm --prefix server install`.
3. Start both applications with `npm run dev`.
4. Open `http://localhost:5173` for the React dashboard. The API is at `http://localhost:5000/api`.

## Public preview

The public demo is available at <https://vaishnavichette-ai.github.io/daylight-habit-tracker/>. It runs in preview mode with sample habits. Account login and MongoDB persistence require a separately deployed API; configure `VITE_API_URL` at build time and set the server's `CLIENT_URL`, `MONGODB_URI`, and `JWT_SECRET` for that deployment.

## REST API

All routes below are prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

| Method | Route | Purpose |
|---|---|---|
| POST | `/auth/register` | Create an account and receive a JWT |
| POST | `/auth/login` | Sign in and receive a JWT |
| GET | `/auth/me` | Get the current account |
| GET, POST | `/habits` | List or create habits |
| GET, PATCH, DELETE | `/habits/:id` | Read, update/archive, or delete an owned habit |
| GET | `/completions?from=YYYY-MM-DD&to=YYYY-MM-DD` | Read completion history |
| PUT | `/completions` | Set a habit's count for a date; a count of zero clears it |
| DELETE | `/completions/:habitId?date=YYYY-MM-DD` | Remove a dated completion |
| GET | `/health` | API health check |

Registration grants the `user` role. The `admin` role is included in the user model as a foundation for future admin-only features; public routes never allow callers to choose their role. The dashboard has a preview mode with sample data before sign-in. Creating an account or signing in loads that user's saved MongoDB habits; new habits and today's check-offs are saved to the API. Update and archive are supported by the API for future management controls in the UI.

## Project layout

```text
src/                   React dashboard
server/src/models/     MongoDB User, Habit, and Completion schemas
server/src/routes/     Authentication, habit, and completion endpoints
server/src/middleware/ JWT authentication and admin role middleware
```

## Project documents

- [Hackathon presentation](docs/Habit_Tracking_Application_Hackathon.pptx)
- [Project report](docs/Habit_Tracking_Application_Project_Report.docx)

Never commit server/.env; it contains local secrets. Use server/.env.example as a template and replace the JWT secret for your machine.

