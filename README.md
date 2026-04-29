# 🎬 MovieFlix 2.0 - Backend API

MovieFlix 2.0 is a robust, production-ready backend system for a movie reservation service. Built with **Node.js**, **Express**, and **MongoDB**, it handles complex business logic including seat scheduling, real-time availability, and secure user management.

---

## 🚀 Key Features

### 👤 User Authentication & Authorization
- **Role-Based Access Control (RBAC):** Distinct roles for `Admin` and `Regular User`.
- **Secure Sign-up/Login:** Using JWT (JSON Web Tokens) for stateless authentication.
- **Admin Management:** Initial admin setup via seeding, with the ability for admins to promote other users.

### 🎥 Movie & Showtime Management (Admin Only)
- **CRUD Operations:** Admins can add, update, and delete movies.
- **Rich Data:** Each movie includes title, description, poster image, and genre categorization.
- **Showtime Scheduling:** Admins manage showtimes for every movie.

### 🎟️ Reservation System
- **Dynamic Browsing:** Users can view movies and their specific showtimes filtered by date.
- **Interactive Seat Selection:** Real-time visibility of available seats to prevent overbooking.
- **Booking Management:** Users can track their reservation history and cancel upcoming bookings.
- **Anti-Overbooking Logic:** Robust backend validation to ensure seats aren't double-booked.

### 📊 Admin Reporting
- **Capacity Tracking:** Monitor seat occupancy across showtimes.
- **Revenue Analytics:** Detailed reporting on earnings from reservations.
- **Global Overview:** See all reservations across the entire system.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose
- **Auth:** JWT (JSON Web Tokens) & Bcrypt
- **Documentation:** Swagger (Planned)

---

## 🏗️ Data Model (Planned)

| Entity | Description |
| :--- | :--- |
| **User** | Stores credentials, profile info, and roles (`admin`/`user`). |
| **Movie** | Contains metadata like title, description, genre, and poster. |
| **Showtime** | Maps a Movie to a specific time, theater/room, and price. |
| **Reservation** | Links a User to a Showtime and specific seat numbers. |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Simply-Incognito/MovieFlix2.0.git
   cd MovieFlix2.0
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (`.env`):
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🛣️ API Roadmap (Coming Soon)

- `POST /api/auth/register` - User signup
- `POST /api/auth/login` - User login
- `GET /api/movies` - List all movies
- `POST /api/movies` - Add a movie (Admin)
- `GET /api/showtimes?date=YYYY-MM-DD` - Get showtimes
- `POST /api/reservations` - Book a seat

---

> [!IMPORTANT]
> **Implementation Note:** To avoid overbooking, the system uses database-level transactions or atomic operations during the reservation process.

---

## 📄 License
This project is licensed under the **ISC License**.
