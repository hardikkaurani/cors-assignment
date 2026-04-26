# 🚀 Creator Platform

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-green" />
  <img src="https://img.shields.io/badge/Docker-Containerized-blue" />
  <img src="https://img.shields.io/badge/Realtime-Socket.io-orange" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

# 🌟 Overview

A **full-stack MERN Creator Platform** built with real-time capabilities using Socket.io.
Designed for scalability, performance, and production-ready deployment using Docker & Nginx.

> ⚡ Think: Instagram-lite + Real-time System + DevOps Ready

---

# 🛠️ Tech Stack

### 💻 Frontend

* React (Vite)
* Axios
* Socket.io Client
* React Hot Toast

### ⚙️ Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Multer (File Uploads)
* Cloudinary (Image Storage)
* Socket.io (Realtime)

### 🐳 DevOps

* Docker & Docker Compose
* Nginx (Production Build Serving)

---

# ✨ Features

* 🔐 Secure Authentication (JWT)
* 📝 Create, Delete & Manage Posts
* 🖼️ Cloudinary Image Uploads
* ⚡ Real-time Notifications (Socket.io)
* 🔄 Multi-tab Sync
* 📦 Fully Dockerized System
* 🌐 Production-ready with Nginx
* 💾 Persistent MongoDB Storage

---

# 🏗️ Architecture

```bash
Client (React + Nginx)
        ↓
Server (Node.js + Express + Socket.io)
        ↓
MongoDB (Docker Volume)
```

---

# 📂 Project Structure

```bash
cors-assignment/
│
├── frontend/            # React App
│   ├── src/
│   ├── nginx.conf
│   └── Dockerfile
│
├── server/              # Backend API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── Dockerfile
│
├── docker-compose.yml   # Full Stack Setup
├── .env.example
└── README.md
```

---

# ⚡ Getting Started

### 🐳 Run with Docker (Recommended)

```bash
docker compose up --build
```

🌐 App will be live at:
👉 http://localhost:3000

---

### 🛑 Stop Containers

```bash
docker compose down
```

---

# 🔐 Environment Variables

Create a `.env` file inside `/server`

```env
JWT_SECRET=your_secret
MONGODB_URI=mongodb://mongo:27017/mydb

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

# 🔄 Real-Time Flow

1. User creates a post
2. Backend emits `newPost` event
3. All connected clients receive update
4. Toast notification appears instantly ⚡

---

# 🐳 Docker Services

| Service | Description      | Port  |
| ------- | ---------------- | ----- |
| client  | React + Nginx    | 3000  |
| server  | Node.js API      | 5000  |
| mongo   | MongoDB Database | 27017 |

---

# 🧪 Tested Features

* ✅ Authentication (Register/Login)
* ✅ Image Upload
* ✅ Post CRUD
* ✅ Real-time Notifications
* ✅ Multi-tab Sync
* ✅ Docker Compose Setup
* ✅ Data Persistence

---

# 💾 Data Persistence

MongoDB runs with Docker Volume → Data remains even after container restart.

---

# 🔧 Run Without Docker

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🚀 Future Improvements

* ❤️ Likes & Comments
* 👤 User Profiles
* 🔔 Notification Center
* 🌍 Deployment (AWS / Vercel)
* 📱 Mobile Responsiveness Upgrade

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

# 📜 License

This project is licensed under the **MIT License**

---

# 👨‍💻 Author

**Hardik Kaurani**

🔗 GitHub: https://github.com/hardikkaurani

---

# 😉 Creation

<p align="center">
  Made with ❤️ by <b>Hardik Kaurani</b>
</p>
