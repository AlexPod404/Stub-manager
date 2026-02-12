#!/bin/bash

# Build script for Stub Manager

set -e

echo "=== Building Stub Manager ==="

# Build backend
echo "Building backend..."
cd backend
mvn clean package -DskipTests
echo "✓ Backend built successfully"
cd ..

# Build runtime
echo "Building runtime..."
cd runtime
mvn clean package -DskipTests
echo "✓ Runtime built successfully"
cd ..

echo ""
echo "=== Build Complete ==="
echo "Backend JAR: backend/target/stub-manager-backend-1.0.0-SNAPSHOT.jar"
echo "Runtime JAR: runtime/target/stub-manager-runtime-1.0.0-SNAPSHOT.jar"
