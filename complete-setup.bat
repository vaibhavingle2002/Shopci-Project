@echo off
echo ========================================
echo    FlipMart - Complete Product Setup
echo ========================================
echo.

echo Step 1: Adding 50 products (10 per category)...
cd backend
call npm run add-products
if %errorlevel% neq 0 (
    echo Error adding products
    pause
    exit /b 1
)

echo.
echo Step 2: Adding demo users and orders...
call npm run add-demo
if %errorlevel% neq 0 (
    echo Error adding demo data
    pause
    exit /b 1
)

echo.
echo Step 3: Starting Backend Server...
start "FlipMart Backend" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Step 4: Starting Frontend Server...
cd ..\frontend
start "FlipMart Frontend" cmd /k "npm start"

echo.
echo ========================================
echo 🎉 FlipMart is ready with full inventory!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🛠️  Admin:    http://localhost:3000/admin
echo 🔧 Backend:  http://localhost:5000
echo.
echo 📦 Products Added:
echo    • Electronics: 10 products
echo    • Fashion: 10 products  
echo    • Home & Kitchen: 10 products
echo    • Books: 10 products
echo    • Sports: 10 products
echo    📊 Total: 50 products
echo.
echo 👤 Demo Login (password: 123456):
echo    • john@example.com
echo    • admin@flipmart.com
echo ========================================
pause