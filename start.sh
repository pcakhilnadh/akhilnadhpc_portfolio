#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Portfolio Application with Nginx + FastAPI"

# Start FastAPI in the background
echo "📡 Starting FastAPI on port 8000..."
cd /app
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 &
FASTAPI_PID=$!

# Wait a moment for FastAPI to start
sleep 3

# Check if FastAPI started successfully
if ! kill -0 $FASTAPI_PID 2>/dev/null; then
    echo "❌ FastAPI failed to start"
    exit 1
fi

echo "✅ FastAPI started successfully (PID: $FASTAPI_PID)"

# Start Nginx in the foreground (keeps container running)
echo "🌐 Starting Nginx on port 8080..."
nginx -g "daemon off;" &
NGINX_PID=$!

echo "✅ Nginx started successfully (PID: $NGINX_PID)"
echo "🎯 Application ready at http://localhost:8080"

# Function to handle shutdown
shutdown() {
    echo "🛑 Shutting down services..."
    kill $NGINX_PID 2>/dev/null || true
    kill $FASTAPI_PID 2>/dev/null || true
    wait
    echo "✅ Shutdown complete"
    exit 0
}

# Trap signals for graceful shutdown
trap shutdown SIGTERM SIGINT

# Wait for both processes
wait 