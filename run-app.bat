@echo off
echo ========================================
echo    FlipMart E-commerce Application
echo ========================================
echo.

echo Starting Backend Server...
start "FlipMart Backend" cmd /k "cd /d \"%~dp0backend\" && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "FlipMart Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm start"

echo.
echo ========================================
echo Application is starting...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo Admin:    http://localhost:3000/admin
echo.
echo Both servers will open in separate windows
echo ========================================
echo.
pause