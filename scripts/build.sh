#!/bin/bash

# Build script for Stub Manager

set -e

echo "=== Building Stub Manager ==="
echo "Using unified parent POM for multi-module build..."

# Build all modules from parent POM
mvn clean package -DskipTests

echo ""
echo "=== Build Complete ==="
echo "Backend JAR: backend/target/stub-manager-backend-1.0.0-SNAPSHOT.jar"
echo "Runtime JAR: runtime/target/stub-manager-runtime-1.0.0-SNAPSHOT.jar"
