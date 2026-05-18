# 🎓 Authentication & Authorization System — Learning Platform

A secure backend built with **Node.js**, **Express**, **MongoDB**, **JWT**, and **bcrypt**.

---

## 📁 Project Structure

```
auth-system/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Register & Login logic
│   │   └── userController.js  # User CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT verify + Role guard
│   ├── models/
│   │   └── User.js            # Mongoose schema (auto-hashes password)
│   ├── routes/
│   │   ├── authRoutes.js      # /api/auth/*
│   │   └── userRoutes.js      # /api/users/*
│   └── server.js              # Entry point
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Edit `.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/learning_platform
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Run the Server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server starts at: `http://localhost:5000`

---

## 🔐 How It Works

| Concept | Implementation |
|--------|---------------|
| Password Hashing | `bcryptjs` with salt rounds = 12 |
| Token | JWT signed with `JWT_SECRET`, expires in 7 days |
| Token Location | `Authorization: Bearer <token>` header |
| Role Guard | `restrictTo('admin')` middleware on protected routes |

---

## 📡 API Endpoints

### Auth Routes (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### User Routes (Protected — requires Bearer token)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/users/me` | Student / Admin | Get own profile |
| PUT | `/api/users/me` | Student / Admin | Update own profile |
| GET | `/api/users` | Admin only | Get all users |
| GET | `/api/users/:id` | Admin only | Get any user by ID |
| DELETE | `/api/users/:id` | Admin only | Delete any user |

---

## 📨 Sample Requests & Responses

### 1. Register a Student

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "secret123",
  "role": "student"
}
```

**Response (201):**
```json
{
  "message": "Registration successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6639f3a1b8e6a20012345678",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "student"
  }
}
```

---

### 2. Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "rahul@example.com",
  "password": "secret123"
}
```

**Response (200):**
```json
{
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6639f3a1b8e6a20012345678",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "student"
  }
}
```

---

### 3. Get My Profile (Student or Admin)

**Request:**
```http
GET /api/users/me
Authorization: Bearer <your_token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "6639f3a1b8e6a20012345678",
    "name": "Rahul Sharma",
    "email": "rahul@example.com",
    "role": "student",
    "bio": "",
    "createdAt": "2024-05-01T10:00:00.000Z"
  }
}
```

---

### 4. Update My Profile

**Request:**
```http
PUT /api/users/me
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Rahul S.",
  "bio": "I love learning!"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully.",
  "user": {
    "_id": "6639f3a1b8e6a20012345678",
    "name": "Rahul S.",
    "bio": "I love learning!",
    "role": "student"
  }
}
```

---

### 5. Admin: Get All Users

**Request:**
```http
GET /api/users
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "count": 2,
  "users": [
    { "_id": "...", "name": "Rahul Sharma", "email": "rahul@example.com", "role": "student" },
    { "_id": "...", "name": "Admin User", "email": "admin@example.com", "role": "admin" }
  ]
}
```

---

### 6. Admin: Delete a User

**Request:**
```http
DELETE /api/users/6639f3a1b8e6a20012345678
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "User \"Rahul Sharma\" deleted successfully."
}
```

---

### 7. Access Denied (403 Example)

A student trying to access admin routes:

**Response (403):**
```json
{
  "message": "Access denied. Only [admin] can perform this action."
}
```

### 8. No Token (401 Example)

**Response (401):**
```json
{
  "message": "Access denied. No token provided."
}
```

---

## 🧪 Testing with Postman / Thunder Client

1. Register a user → copy the `token`
2. In subsequent requests, add header: `Authorization: Bearer <token>`
3. Register an admin with `"role": "admin"` to test admin routes

## 📝 License

MIT

