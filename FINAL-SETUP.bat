@echo off
echo ========================================
echo    FlipMart - COMPLETE DATA SETUP
echo ========================================
echo.

echo 🔄 Setting up complete FlipMart data...
cd backend

echo Step 1: Setting up database and all data...
call npm run setup-complete
if %errorlevel% neq 0 (
    echo ❌ Error setting up data
    pause
    exit /b 1
)

echo.
echo Step 2: Starting Backend Server...
start "FlipMart Backend" cmd /k "npm run dev"

echo ⏳ Waiting for backend to initialize...
timeout /t 8 /nobreak > nul

echo Step 3: Starting Frontend Server...
cd ..\frontend
start "FlipMart Frontend" cmd /k "npm start"

echo.
echo ========================================
echo 🎉 FlipMart is FULLY LOADED and READY!
echo ========================================
echo.
echo 🌐 Access Points:
echo    📱 Store:  http://localhost:3000
echo    🛠️  Admin:  http://localhost:3000/admin
echo    🔧 API:    http://localhost:5000
echo.
echo 📊 Complete Data Loaded:
echo    📦 Products: 50 (10 per category)
echo    👥 Users: 5 with purchase history
echo    🛒 Orders: 10 with real sales data
echo    💰 Revenue: ₹4,12,589 total sales
echo.
echo 🔐 Test Login Credentials:
echo    Email: john@example.com
echo    Email: admin@flipkart.com
echo    Password: 123456
echo.
echo 📱 Categories with Products:
echo    • Electronics (10) - Phones, Laptops, etc.
echo    • Fashion (10) - Shoes, Clothes, etc.
echo    • Home & Kitchen (10) - Appliances, etc.
echo    • Books (10) - Novels, Self-help, etc.
echo    • Sports (10) - Fitness, Equipment, etc.
echo ========================================
pause