@echo off
echo ========================================
echo    Setting up FlipMart with Demo Data
echo ========================================
echo.

echo Step 1: Adding demo users and orders...
cd backend
call npm run add-demo
if %errorlevel% neq 0 (
    echo Error adding demo data
    pause
    exit /b 1
)

echo.
echo Step 2: Starting Backend Server...
start "FlipMart Backend" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Step 3: Starting Frontend Server...
cd ..\frontend
start "FlipMart Frontend" cmd /k "npm start"

echo.
echo ========================================
echo FlipMart is starting with demo data!
echo.
echo Frontend: http://localhost:3000
echo Admin:    http://localhost:3000/admin
echo Backend:  http://localhost:5000
echo.
echo Demo Users (password: 123456):
echo - john@example.com
echo - jane@example.com  
echo - admin@flipmart.com
echo.
echo Demo data includes:
echo - 15 products across 5 categories
echo - 5 demo users with order history
echo - 7 sample orders with analytics
echo ========================================
pause