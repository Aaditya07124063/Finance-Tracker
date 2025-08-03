@echo off
chcp 65001 >nul

echo 💰 Finance Tracker Auto-Launcher
echo =================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found. Please run this script from the Finance Tracker directory.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  Warning: .env file not found
    echo    You may need to set up Supabase configuration
    echo    Create a .env file with your Supabase credentials:
    echo    VITE_SUPABASE_URL=your_supabase_url
    echo    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    echo.
)

echo 🚀 Starting Finance Tracker...
echo    The application will open automatically in your browser
echo    If it doesn't open, go to: http://localhost:5173
echo.
echo    Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev 