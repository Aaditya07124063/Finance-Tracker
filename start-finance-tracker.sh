#!/bin/bash

# Finance Tracker Auto-Launcher
# This script will automatically start the Finance Tracker application

echo "💰 Finance Tracker Auto-Launcher"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the Finance Tracker directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found"
    echo "   You may need to set up Supabase configuration"
    echo "   Create a .env file with your Supabase credentials:"
    echo "   VITE_SUPABASE_URL=your_supabase_url"
    echo "   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo ""
fi

echo "🚀 Starting Finance Tracker..."
echo "   The application will open automatically in your browser"
echo "   If it doesn't open, go to: http://localhost:5173"
echo ""
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev 