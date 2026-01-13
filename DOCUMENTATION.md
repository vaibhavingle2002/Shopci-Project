# ShopCI - Modern E-commerce Platform

A full-stack e-commerce application built with **Node.js**, **React**, **Bootstrap**, and **MySQL**.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Frontend (React + Bootstrap)
- 🎨 Modern, responsive design with clean UI
- 🔍 Product browsing with advanced search and filters
- 🛒 Shopping cart functionality with real-time updates
- 👤 User authentication (login/register)
- 📦 Order management system with order tracking
- 📱 Mobile-responsive design
- 🏷️ Product categories with intuitive navigation

### Backend (Node.js + Express)
- 🔐 JWT-based authentication
- 📊 RESTful API architecture
- 🗄️ MySQL database integration
- 🛡️ Input validation and security
- 🔄 CORS enabled for cross-origin requests

### Admin Panel
- 📈 Analytics dashboard
- 📦 Product management (CRUD operations)
- 📋 Order management
- 👥 User management

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- React Bootstrap
- Bootstrap 5 + Bootstrap Icons
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- express-validator
- CORS

**Database:**
- MySQL Server

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **MySQL Workbench** (optional but recommended) - [Download](https://dev.mysql.com/downloads/workbench/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "Ecommers project"
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

### Step 3: Configure Environment Variables

Edit the `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce_db

# JWT Secret (change this to a secure random string)
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

## 🗄️ Database Setup

### Option 1: Automated Setup (Recommended)

```bash
# From backend directory
cd backend

# Setup database and add demo data
npm run setup-db

# Create demo users
node create-demo-users.js

# Create admin user
node create-custom-admin.js
```

### Option 2: Manual Setup

1. **Create Database:**
   ```sql
   CREATE DATABASE ecommerce_db;
   USE ecommerce_db;
   ```

2. **Run Setup Script:**
   ```bash
   cd backend
   node scripts/setupDatabase.js
   ```

3. **Create Users:**
   ```bash
   node create-demo-users.js
   node create-custom-admin.js
   ```

## 🏃‍♂️ Running the Application

### Start Backend Server

```bash
# From backend directory
cd backend
npm run dev
# Server will run on http://localhost:5000
```

### Start Frontend Development Server

```bash
# From frontend directory (in a new terminal)
cd frontend
npm start
# Application will open at http://localhost:3000
```

### Quick Start (Both Servers)

```bash
# From project root directory
start-both-servers.bat
```

## 🔑 Demo Credentials

### Admin Access
```
Email: admin@123
Password: admin@123
Role: Administrator
```

**Admin Features:**
- Dashboard with analytics
- Product management (Add/Edit/Delete)
- Order management
- User management

### Normal Users

**User 1:**
```
Email: user@example.com
Password: 123456
Role: Customer
```

**User 2:**
```
Email: test@test.com
Password: 123456
Role: Customer
```

**User 3:**
```
Email: demo@123
Password: demo@123
Role: Customer
```

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | `{name, email, password, phone?, address?}` |
| POST | `/auth/login` | User login | `{email, password}` |

### Products Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get single product | No |
| GET | `/products/featured/list` | Get featured products | No |

### Categories Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/:id` | Get single category | No |

### Cart Endpoints (Protected)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/cart` | Get cart items | - |
| POST | `/cart/add` | Add item to cart | `{product_id, quantity}` |
| PUT | `/cart/update/:id` | Update cart item | `{quantity}` |
| DELETE | `/cart/remove/:id` | Remove from cart | - |

### Orders Endpoints (Protected)

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/orders/create` | Create new order | `{items, total_amount, shipping_address}` |
| GET | `/orders` | Get user orders | - |
| GET | `/orders/:id` | Get order details | - |
| PUT | `/orders/:id/cancel` | Cancel order | - |

### Admin Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/analytics` | Get dashboard analytics |
| GET | `/admin/products` | Get all products |
| POST | `/admin/products` | Add new product |
| PUT | `/admin/products/:id` | Update product |
| DELETE | `/admin/products/:id` | Delete product |
| GET | `/admin/orders` | Get all orders |
| PUT | `/admin/orders/:id/status` | Update order status |

## 📁 Project Structure

```
ShopCI/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/             # Route controllers
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── products.js         # Product routes
│   │   ├── categories.js       # Category routes
│   │   ├── cart.js             # Cart routes
│   │   ├── orders.js           # Order routes
│   │   └── admin.js            # Admin routes
│   ├── scripts/
│   │   └── setupDatabase.js    # Database setup script
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js       # Main navigation
│   │   │   ├── Footer.js       # Footer component
│   │   │   ├── ProductCard.js  # Product display card
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   ├── AuthContext.js  # Authentication context
│   │   │   └── CartContext.js  # Cart state management
│   │   ├── pages/
│   │   │   ├── Home.js         # Homepage
│   │   │   ├── Products.js     # Product listing
│   │   │   ├── ProductDetail.js # Product details
│   │   │   ├── Cart.js         # Shopping cart
│   │   │   ├── Checkout.js     # Checkout process
│   │   │   ├── Orders.js       # Order history
│   │   │   ├── OrderDetail.js  # Order details
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Registration page
│   │   │   └── admin/          # Admin pages
│   │   ├── services/
│   │   │   ├── api.js          # API service layer
│   │   │   └── adminAPI.js     # Admin API calls
│   │   ├── App.js              # Main app component
│   │   ├── App.css             # Global styles
│   │   └── index.js            # App entry point
│   └── package.json
├── README.md
└── package.json
```

## 🗃️ Database Schema

### Tables

**users**
- `id` (Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `phone` (VARCHAR)
- `address` (TEXT)
- `role` (VARCHAR: 'user', 'admin')
- `created_at` (TIMESTAMP)

**categories**
- `id` (Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `image` (VARCHAR)
- `created_at` (TIMESTAMP)

**products**
- `id` (Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `original_price` (DECIMAL)
- `discount_percentage` (INT)
- `category_id` (Foreign Key)
- `brand` (VARCHAR)
- `stock_quantity` (INT)
- `image` (VARCHAR)
- `rating` (DECIMAL)
- `reviews_count` (INT)
- `created_at` (TIMESTAMP)

**cart**
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity` (INT)
- `created_at` (TIMESTAMP)

**orders**
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `total_amount` (DECIMAL)
- `status` (VARCHAR: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `shipping_address` (TEXT)
- `created_at` (TIMESTAMP)

**order_items**
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `product_id` (Foreign Key)
- `quantity` (INT)
- `price` (DECIMAL)

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
```bash
# Check MySQL service is running
# Verify credentials in .env file
# Ensure database exists
```

**2. Port Already in Use**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

**3. Module Not Found**
```bash
# Reinstall dependencies
cd backend && npm install
cd frontend && npm install
```

**4. CORS Issues**
- Ensure backend is running on port 5000
- Check frontend proxy configuration

### Useful Commands

```bash
# Check backend status
curl http://localhost:5000/api/products

# Reset database
cd backend && node scripts/setupDatabase.js

# View logs
cd backend && npm run dev

# Build for production
cd frontend && npm run build
```

## 📝 Development Notes

- **JWT tokens expire in 24 hours**
- **All product images are from Unsplash**
- **Free shipping on all orders**
- **Responsive design works on mobile and desktop**
- **Admin panel accessible at `/admin`**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**ShopCI** - Modern E-commerce Platform © 2024