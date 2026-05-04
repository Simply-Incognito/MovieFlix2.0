# 🎬 MovieFlix 2.0 - Backend API

MovieFlix 2.0 is a robust, production-ready backend system for a movie reservation service. Built with **Node.js**, **Express**, and **MongoDB**, it handles complex business logic including seat scheduling, real-time availability, and secure user management.

---

## 🚀 Key Features

### 👤 User Authentication & Authorization
- **Role-Based Access Control (RBAC):** Distinct roles for `admin` and `user`.
- **Secure Sign-up/Login:** Using JWT (JSON Web Tokens) for stateless authentication.
- **Admin Management:** Automatic super-admin setup on server start, with the ability for admins to promote other users.

### 🎥 Movie & Showtime Management
- **Movie CRUD:** Admins can add, update, and delete movies. Anyone can view them.
- **Showtime Scheduling:** Admins manage showtimes for every movie, including room capacity and pricing.
- **Dynamic Browsing:** Users can view movies and their specific showtimes.

### 🎟️ Reservation System
- **Interactive Seat Selection:** Real-time visibility of available seats to prevent overbooking.
- **Booking Management:** Users can track their own reservation history and cancel upcoming bookings.
- **Anti-Overbooking Logic:** Robust backend validation to ensure seats aren't double-booked.

### 📊 Admin Reporting & Metrics
- **Performance Analytics:** Admins can view system-wide metrics including total reservations, total revenue, overall capacity, and occupancy rates.
- **Global Overview:** Access to all reservations across the entire system.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose
- **Auth:** JWT (JSON Web Tokens) & Bcrypt
- **Environment Management:** dotenv

---

## 🏗️ Data Model

| Entity | Description |
| :--- | :--- |
| **User** | Stores credentials, profile info, and roles (`admin`/`user`). |
| **Movie** | Contains metadata like title, description, genre, and duration. |
| **Showtime** | Maps a Movie to a specific time, theater/room, capacity, and price. |
| **Reservation** | Links a User to a Showtime and a specific seat number. |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Simply-Incognito/MovieFlix2.0.git
   cd MovieFlix2.0/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (`config.env`):
   ```env
   PORT=5000
   LOCAL_DB_URI=mongodb://localhost:27017/movieflix
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=90d
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

> [!NOTE]
> **Admin Seeding:** The system automatically attempts to create a super-admin user from `data/users.json` when the server starts. Ensure the server is running to complete this process.

---

## 🛣️ API Endpoints

### Authentication & Users
- `POST /api/v2/auth/register` - Register a new user.
- `POST /api/v2/auth/login` - Login and receive a JWT.
- `POST /api/v2/auth/promote/:id` - Promote a user to `admin` (Admin only).

### Movies
- `GET /api/v2/movies` - List all movies.
- `GET /api/v2/movies/:id` - Get details of a specific movie.
- `POST /api/v2/movies` - Add a new movie (Admin only).
- `PATCH /api/v2/movies/:id` - Update movie details (Admin only).
- `DELETE /api/v2/movies/:id` - Remove a movie (Admin only).

### Showtimes
- `GET /api/v2/showtimes` - List all showtimes.
- `POST /api/v2/showtimes` - Create a new showtime (Admin only).
- `GET /api/v2/showtimes/:id/seats` - Get available/occupied seats for a showtime.

### Reservations
- `GET /api/v2/reservations` - Get all reservations for the logged-in user.
- `POST /api/v2/reservations` - Book a seat for a showtime.
- `DELETE /api/v2/reservations/:id` - Cancel a reservation.
- `GET /api/v2/reservations/metrics` - View system-wide metrics (Admin only).

---

## 📂 Project Structure

```text
server/
├── Controllers/    # Request handlers & business logic
├── Models/         # Mongoose schemas
├── Routes/         # API route definitions
├── Middlewares/    # Auth & error handling logic
├── Utils/          # Helper functions & database connection
├── data/           # Seed data
└── app.js          # Express app configuration
```

---

## 📄 License
This project is licensed under the **ISC License**.
