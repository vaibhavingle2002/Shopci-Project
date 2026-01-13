@echo off
echo FlipMart Diagnostic Check
echo ========================
echo.

echo 1. Checking Backend Server (Port 5000)...
netstat -an | findstr :5000 > nul
if %errorlevel% == 0 (
    echo ✅ Backend server appears to be running
) else (
    echo ❌ Backend server not detected on port 5000
)

echo.
echo 2. Checking Frontend Server (Port 3000)...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ✅ Frontend server appears to be running
) else (
    echo ❌ Frontend server not detected on port 3000
)

echo.
echo 3. Checking Database Connection...
cd /d "c:\Users\Asus\Downloads\Ecommers project\backend"
node test-connection.js

echo.
echo 4. Checking Product Data...
node scripts/testAPI.js

echo.
echo Diagnostic complete!
echo.
echo If servers are not running, use: start-both-servers.bat
echo.
pause