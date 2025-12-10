@echo off
REM Medical Document Portal - Development Server Starter (Windows)
REM This script starts both Backend and Frontend servers

echo =========================================
echo   Medical Document Portal
echo   Starting Development Servers
echo =========================================
echo.

REM Check if Backend directory exists
if not exist "Backend\" (
    echo Error: Backend directory not found
    exit /b 1
)

REM Check if Frontend directory exists
if not exist "Frontend\" (
    echo Error: Frontend directory not found
    exit /b 1
)

REM Check if node_modules exists in Backend
if not exist "Backend\node_modules\" (
    echo Backend dependencies not installed. Installing...
    cd Backend
    call npm install
    cd ..
)

REM Check if node_modules exists in Frontend
if not exist "Frontend\node_modules\" (
    echo Frontend dependencies not installed. Installing...
    cd Frontend
    call npm install
    cd ..
)

echo Starting Backend Server...
start "Backend Server" cmd /k "cd Backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd Frontend && npm run dev"

echo.
echo =========================================
echo Servers Started Successfully!
echo =========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows opened:
echo - Backend Server (Port 5000)
echo - Frontend Server (Port 3000)
echo.
echo Close the terminal windows to stop servers
echo =========================================
echo.

pause

