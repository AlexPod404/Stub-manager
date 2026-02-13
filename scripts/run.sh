#!/bin/bash

# Run script for Stub Manager

set -e

MODE=${1:-docker}

if [ "$MODE" = "docker" ]; then
    echo "=== Starting Stub Manager with Docker Compose ==="
    cd docker
    docker-compose up -d
    echo ""
    echo "Services started:"
    echo "  - Backend: http://localhost:8080"
    echo "  - Runtime: http://localhost:8081"
    echo "  - Swagger UI: http://localhost:8080/swagger-ui.html"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: docker-compose down"
    
elif [ "$MODE" = "local" ]; then
    echo "=== Starting Stub Manager locally ==="
    echo "Make sure PostgreSQL and Redis are running!"
    echo ""
    
    # Start backend in background
    echo "Starting backend..."
    cd backend
    java -jar target/stub-manager-backend-1.0.0-SNAPSHOT.jar &
    BACKEND_PID=$!
    cd ..
    
    # Start runtime in background
    echo "Starting runtime..."
    cd runtime
    java -jar target/stub-manager-runtime-1.0.0-SNAPSHOT.jar &
    RUNTIME_PID=$!
    cd ..
    
    echo ""
    echo "Services started:"
    echo "  - Backend PID: $BACKEND_PID"
    echo "  - Runtime PID: $RUNTIME_PID"
    echo ""
    echo "To stop: kill $BACKEND_PID $RUNTIME_PID"
    
else
    echo "Usage: ./run.sh [docker|local]"
    echo "  docker - Run with Docker Compose (default)"
    echo "  local  - Run locally with Java"
    exit 1
fi
