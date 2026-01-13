@echo off
echo Setting up FlipMart E-commerce Project...
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Setting up Database...
call npm run setup-db
if %errorlevel% neq 0 (
    echo Error setting up database. Please check your MySQL connection in .env file
    pause
    exit /b 1
)

echo.
echo Step 3: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start backend: cd backend && npm run dev
echo 2. Start frontend: cd frontend && npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause