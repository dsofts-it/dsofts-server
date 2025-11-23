@echo off
echo ========================================
echo DSofts Backend Setup Script
echo ========================================
echo.

echo Step 1: Creating .env file from template...
copy .env.example .env
echo .env file created successfully!
echo.

echo Step 2: Installing dependencies...
call npm install
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update .env file with your MongoDB URI
echo 2. Run 'npm run dev' to start the development server
echo.
pause
