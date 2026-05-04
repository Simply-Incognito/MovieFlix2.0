# 🎬 MovieFlix 2.0 - Backend API

MovieFlix 2.0 is a robust, production-ready backend system for a movie reservation service. Built with **Node.js**, **Express**, and **MongoDB**, it handles complex business logic including seat scheduling, real-time availability, and secure user management.

---

## 🚀 Key Features

### 👤 User Authentication & Authorization
- **Role-Based Access Control (RBAC):** Distinct roles for `admin` and `user`.
- **Secure Sign-up/Login:** Using JWT (JSON Web Tokens) for stateless authentication.
- **Admin Management:** Automatic super-admin setup on server start, with the ability for admins to promote other users.

### 🎥 Movie & Showtime Management
- **Soft Deletes:** Movies are never fully removed from the database; they are deactivated to preserve historical reservation data.
- **Movie CRUD:** Admins can manage the movie catalog. Users only see active movies.
- **Showtime Scheduling:** Admins manage showtimes, ensuring movies are only scheduled in compatible rooms.

### 🏠 Room Management
- **Dynamic Theaters:** Manage different theater rooms with unique capacities and types (Standard, VIP, Premium).
- **Compatibility Checks:** Validation logic ensures movies are only aired in designated rooms.

### 🎟️ Reservation System
- **Atomic Transactions:** Uses MongoDB Sessions to prevent race conditions and ensure seats are never double-booked.
- **Interactive Seat Selection:** Real-time visibility of available seats based on room capacity.
- **Booking Management:** Users can track their history and cancel reservations up to **24 hours** before the showtime.

### 📊 Admin Reporting & Metrics
- **Performance Analytics:** Admins can view system-wide metrics including total reservations, total revenue, overall capacity, and occupancy rates using MongoDB Aggregation.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Replica Set required for Transactions)
- **ORM:** Mongoose
- **Auth:** JWT (JSON Web Tokens) & Bcrypt

---

## 🏗️ Data Model

| Entity | Description |
| :--- | :--- |
| **User** | Stores credentials, profile info, and roles (`admin`/`user`). |
| **Movie** | Metadata like title, duration, and genre. Supports soft-deletion via `active` flag. |
| **Room** | Defines theater capacity, type, and allowed movies. |
| **Showtime** | Links a Movie to a Room and specific time. |
| **Reservation** | Links a User to a Showtime and a specific seat number. |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB configured as a **Replica Set** (Required for Transactions)

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
   LOCAL_DB_URI=mongodb://127.0.0.1:27017/movieflix?replicaSet=rs0
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=90d
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🛣️ API Endpoints

### Authentication & Users
- `POST /api/v2/auth/register` - Register a new user.
- `POST /api/v2/auth/login` - Login and receive a JWT.
- `POST /api/v2/auth/promote/:id` - Promote a user to `admin`.

### Rooms (Admin Only)
- `GET /api/v2/rooms` - List all rooms.
- `POST /api/v2/rooms` - Add a new room.
- `PATCH /api/v2/rooms/:id` - Update room details.

### Movies
- `GET /api/v2/movies` - List active movies.
- `POST /api/v2/movies` - Add a new movie (Admin).
- `DELETE /api/v2/movies/:id` - Soft-delete a movie (Admin).

### Showtimes
- `GET /api/v2/showtimes` - List showtimes (supports `?date=` filter).
- `POST /api/v2/showtimes` - Create a showtime (Admin).
- `GET /api/v2/showtimes/:id/seats` - Get available seats.

### Reservations
- `POST /api/v2/reservations` - Book a seat (Atomic Transaction).
- `GET /api/v2/reservations` - User reservation history.
- `DELETE /api/v2/reservations/:id` - Cancel (Min. 24h before show).
- `GET /api/v2/reservations/metrics` - System metrics (Admin).

---

## 📄 License
This project is licensed under the **ISC License**.

