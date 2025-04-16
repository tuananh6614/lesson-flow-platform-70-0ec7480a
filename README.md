
# EPULearn - Learning Management System

EPULearn is a full-stack learning management system that allows students to access courses, track progress, and earn certificates.

## Project Structure

- `/src` - React frontend application
- `/backend` - Express backend API

## Setup & Installation

### Prerequisites

- Node.js (v14+)
- MySQL (with XAMPP or another MySQL server)
- A suitable code editor (VS Code recommended)

### Database Setup

1. Start your MySQL server (e.g., through XAMPP)
2. Create a database named `epulearn`
3. Import the SQL schema from `/backend/database.sql`

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables by creating a `.env` file in the `/backend` directory with the following content:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=epulearn
   DB_USER=root
   DB_PASSWORD=your_password_if_any

   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h

   # API Configuration
   API_PREFIX=/api/v1
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the project root directory and install dependencies:
   ```
   npm install
   ```

2. Start the frontend development server:
   ```
   npm run dev
   ```

## Running the Full Stack Application

There are multiple ways to run the application:

### Development Mode (Separate Terminals)

1. Start the backend (from the `/backend` directory):
   ```
   npm run dev
   ```

2. Start the frontend (from the project root):
   ```
   npm run dev
   ```

3. Access the application at `http://localhost:5173` (or the port shown in your terminal)

## API Endpoints

### Auth API

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get current user profile

### Courses API

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create a new course (admin only)
- `PUT /api/courses/:id` - Update a course (admin only)
- `DELETE /api/courses/:id` - Delete a course (admin only)

### Chapters API

- `GET /api/chapters/course/:courseId` - Get chapters for a course
- `GET /api/chapters/:id` - Get chapter by ID
- `POST /api/chapters` - Create a new chapter (admin only)
- `PUT /api/chapters/:id` - Update a chapter (admin only)
- `DELETE /api/chapters/:id` - Delete a chapter (admin only)

### Lessons API

- `GET /api/lessons/chapter/:chapterId` - Get lessons for a chapter
- `GET /api/lessons/:id` - Get lesson by ID
- `POST /api/lessons` - Create a new lesson (admin only)
- `PUT /api/lessons/:id` - Update a lesson (admin only)
- `DELETE /api/lessons/:id` - Delete a lesson (admin only)

### Enrollment API

- `GET /api/enrollment/user` - Get user enrollments
- `GET /api/enrollment/status` - Check enrollment status
- `POST /api/enrollment` - Enroll in a course
- `PUT /api/enrollment/:id/progress` - Update progress
- `PUT /api/enrollment/:id/drop` - Drop a course

### Exams API

- `GET /api/exams/chapter/:chapterId` - Get exams for a chapter
- `GET /api/exams/:id` - Get exam by ID
- `POST /api/exams/:id/submit` - Submit exam answers
- `GET /api/exams/:id/results` - Get exam results

### Certificates API

- `GET /api/certificates/user` - Get user certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/verify/:certificateUrl` - Verify a certificate

## Frontend Structure

- `/src/components` - Reusable UI components
- `/src/contexts` - React context providers
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and configurations
- `/src/pages` - Application pages/routes
- `/src/services` - API service functions
- `/src/types` - TypeScript type definitions

## Authentication Flow

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in or registers
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage
4. Token is attached to all subsequent API requests
5. Protected routes and actions check for valid token

## Development Notes

- The backend uses MySQL as the database
- JWT is used for API authentication
- Frontend is built with React, TypeScript, and Tailwind CSS
- API services use axios for HTTP requests
