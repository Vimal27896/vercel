#!/bin/bash

# Landslide Shield Full Stack Startup Script
echo "Starting Landslide Shield Full Stack Application"
echo "================================================"

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to start backend
start_backend() {
    echo "Setting up and starting Flask backend..."
    
    # Setup database first
    python3 scripts/setup_database.py
    
    if [ $? -eq 0 ]; then
        echo "Database setup completed successfully"
    else
        echo "Database setup failed"
        exit 1
    fi
    
    # Start Flask backend in background
    python3 scripts/run_backend.py &
    BACKEND_PID=$!
    
    echo "Flask backend started with PID: $BACKEND_PID"
    echo "Backend URL: http://localhost:5000"
    
    # Wait a moment for backend to start
    sleep 3
    
    # Check if backend is running
    if check_port 5000; then
        echo "✓ Backend is running on port 5000"
    else
        echo "✗ Backend failed to start on port 5000"
        exit 1
    fi
}

# Function to start frontend
start_frontend() {
    echo "Starting Next.js frontend..."
    
    # Set environment variable for backend URL
    export FLASK_BACKEND_URL="http://localhost:5000"
    
    # Start Next.js development server
    npm run dev &
    FRONTEND_PID=$!
    
    echo "Next.js frontend started with PID: $FRONTEND_PID"
    echo "Frontend URL: http://localhost:3000"
    
    # Wait a moment for frontend to start
    sleep 5
    
    # Check if frontend is running
    if check_port 3000; then
        echo "✓ Frontend is running on port 3000"
    else
        echo "✗ Frontend failed to start on port 3000"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down services..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✓ Backend stopped"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✓ Frontend stopped"
    fi
    
    echo "Goodbye!"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
echo "Checking prerequisites..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "✗ Python 3 is required but not installed"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is required but not installed"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "✗ npm is required but not installed"
    exit 1
fi

echo "✓ All prerequisites are available"

# Start services
start_backend
start_frontend

echo ""
echo "🚀 Landslide Shield is now running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   API:      http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running
wait
