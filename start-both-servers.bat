@echo off
echo Starting FlipMart E-commerce Application...
echo.

echo Starting Backend Server...
cd /d "c:\Users\Asus\Downloads\Ecommers project\backend"
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
cd /d "c:\Users\Asus\Downloads\Ecommers project\frontend"
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul