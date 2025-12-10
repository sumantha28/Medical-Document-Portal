#!/bin/bash

# Medical Document Portal - Development Server Starter
# This script starts both Backend and Frontend servers

echo "========================================="
echo "  Medical Document Portal"
echo "  Starting Development Servers"
echo "========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Backend directory exists
if [ ! -d "Backend" ]; then
    echo -e "${RED}Error: Backend directory not found${NC}"
    exit 1
fi

# Check if Frontend directory exists
if [ ! -d "Frontend" ]; then
    echo -e "${RED}Error: Frontend directory not found${NC}"
    exit 1
fi

# Check if node_modules exists in Backend
if [ ! -d "Backend/node_modules" ]; then
    echo -e "${YELLOW}Backend dependencies not installed. Installing...${NC}"
    cd Backend
    npm install
    cd ..
fi

# Check if node_modules exists in Frontend
if [ ! -d "Frontend/node_modules" ]; then
    echo -e "${YELLOW}Frontend dependencies not installed. Installing...${NC}"
    cd Frontend
    npm install
    cd ..
fi

echo -e "${GREEN}Starting Backend Server...${NC}"
cd Backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

echo -e "${GREEN}Starting Frontend Server...${NC}"
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================="
echo -e "${GREEN}✓ Servers Started Successfully!${NC}"
echo "========================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================="
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "Servers stopped."
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Wait for both processes
wait

