# ShopCI E-commerce Platform

A modern e-commerce application built with Node.js, React, Bootstrap, and MySQL.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL Server
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd "Ecommers project"

# Backend setup
cd backend
npm install
copy .env.example .env
# Edit .env with your MySQL credentials

# Database setup
npm run setup-db
node create-demo-users.js
node create-custom-admin.js

# Frontend setup
cd ../frontend
npm install
```

### Run Application

```bash
# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
cd frontend && npm start
```

**Application URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔑 Demo Credentials

### Admin Access
```
Email: admin@123
Password: admin@123
```

### Normal Users
```
Email: user@example.com
Password: 123456

Email: test@test.com
Password: 123456

Email: demo@123
Password: demo@123
```

## 📚 Complete Documentation

For detailed setup instructions, API documentation, troubleshooting, and more:

**👉 [View Complete Documentation](./DOCUMENTATION.md)**

## ✨ Features

- **Frontend (React + Bootstrap)**
  - Modern, responsive design with clean UI
  - Product browsing with advanced search and filters
  - Shopping cart functionality with real-time updates
  - User authentication (login/register)
  - Order management system
  - Product categories with intuitive navigation

- **Backend (Node.js + Express)**
  - RESTful API
  - JWT authentication
  - MySQL database integration
  - CORS enabled
  - Input validation

- **Database (MySQL)**
  - Users, products, categories, cart, orders tables
  - Pre-loaded with dummy data
  - Images from Unsplash

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- React Bootstrap
- Bootstrap 5
- Bootstrap Icons
- Axios

### Backend
- Node.js
- Express.js
- MySQL2
- JWT
- bcryptjs
- CORS
- express-validator

## 📁 Project Structure

```
ecommerce-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## 🔧 Quick Commands

```bash
# Reset database
cd backend && node scripts/setupDatabase.js

# Create admin user
cd backend && node create-custom-admin.js

# Create demo users
cd backend && node create-demo-users.js

# Start both servers
start-both-servers.bat
```

## 📝 Notes

- All product images are sourced from Unsplash
- JWT tokens expire in 24 hours
- Free shipping on all orders
- Responsive design works on mobile and desktop
- Admin panel accessible at `/admin`

---

**For complete setup instructions, API documentation, and troubleshooting guide, see [DOCUMENTATION.md](./DOCUMENTATION.md)**