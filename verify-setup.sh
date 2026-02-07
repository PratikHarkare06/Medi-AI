#!/bin/bash

# MediScript AI - Setup Verification Script
# This script checks if everything is properly configured

echo "🔍 MediScript AI - Setup Verification"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

echo ""

# Check server dependencies
echo "📂 Checking server dependencies..."
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Server dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Server dependencies not installed"
    echo "  Run: cd server && npm install"
fi

echo ""

# Check client dependencies
echo "📂 Checking client dependencies..."
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Client dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Client dependencies not installed"
    echo "  Run: cd client && npm install"
fi

echo ""

# Check .env file
echo "🔐 Checking environment configuration..."
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check if API key is set
    if grep -q "GEMINI_API_KEY=.\+" server/.env; then
        echo -e "${GREEN}✓${NC} Gemini API key is configured"
    else
        echo -e "${YELLOW}⚠${NC} Gemini API key is empty"
        echo "  Edit server/.env and add your API key"
        echo "  Get it from: https://makersuite.google.com/app/apikey"
    fi
else
    echo -e "${RED}✗${NC} .env file not found"
    echo "  Copy server/.env.example to server/.env"
    echo "  Then add your Gemini API key"
fi

echo ""

# Check uploads directory
echo "📁 Checking uploads directory..."
if [ -d "server/uploads" ]; then
    echo -e "${GREEN}✓${NC} Uploads directory exists"
else
    echo -e "${YELLOW}⚠${NC} Uploads directory not found"
    echo "  Run: mkdir -p server/uploads"
fi

echo ""

# Check test samples
echo "🧪 Checking test samples..."
if [ -f "test-samples/sample_prescription.png" ]; then
    echo -e "${GREEN}✓${NC} Sample prescription available"
else
    echo -e "${YELLOW}⚠${NC} Sample prescription not found"
fi

echo ""

# Check if ports are available
echo "🔌 Checking port availability..."

if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC} Port 5000 is in use (backend port)"
    echo "  You may need to stop the existing process"
else
    echo -e "${GREEN}✓${NC} Port 5000 is available"
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠${NC} Port 3000 is in use (frontend port)"
    echo "  You may need to stop the existing process"
else
    echo -e "${GREEN}✓${NC} Port 3000 is available"
fi

echo ""
echo "======================================"
echo "📋 Summary"
echo "======================================"
echo ""

# Final recommendations
if [ -f "server/.env" ] && grep -q "GEMINI_API_KEY=.\+" server/.env && [ -d "server/node_modules" ] && [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓ Setup is complete!${NC}"
    echo ""
    echo "🚀 Ready to start:"
    echo "  1. Terminal 1: cd server && npm run dev"
    echo "  2. Terminal 2: cd client && npm run dev"
    echo "  3. Browser: http://localhost:3000"
else
    echo -e "${YELLOW}⚠ Setup is incomplete${NC}"
    echo ""
    echo "📝 Next steps:"
    
    if [ ! -d "server/node_modules" ]; then
        echo "  1. cd server && npm install"
    fi
    
    if [ ! -d "client/node_modules" ]; then
        echo "  2. cd client && npm install"
    fi
    
    if [ ! -f "server/.env" ] || ! grep -q "GEMINI_API_KEY=.\+" server/.env; then
        echo "  3. Configure server/.env with your Gemini API key"
    fi
fi

echo ""
echo "📚 Documentation:"
echo "  - README.md - Full documentation"
echo "  - QUICK_START.md - Quick start guide"
echo "  - TESTING_GUIDE.md - Testing instructions"
echo ""
