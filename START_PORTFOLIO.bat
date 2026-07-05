@echo off
setlocal
cd /d "%~dp0"
title Ecatu Ronald Portfolio Server

echo ============================================================
echo   ECATU RONALD PORTFOLIO - NEXUS FIELD SYSTEMS EDITION
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not available in PATH.
  echo Install Node.js 20 LTS or newer, then run this file again.
  pause
  exit /b 1
)

echo Setting npm to the public registry...
call npm config set registry https://registry.npmjs.org/
if errorlevel 1 goto :failed

if not exist "node_modules" (
  echo Installing root tools...
  call npm install --registry=https://registry.npmjs.org/
  if errorlevel 1 goto :failed
)
if not exist "frontend\node_modules" (
  echo Installing frontend packages...
  call npm install --prefix frontend --registry=https://registry.npmjs.org/
  if errorlevel 1 goto :failed
)
if not exist "backend\node_modules" (
  echo Installing backend packages...
  call npm install --prefix backend --registry=https://registry.npmjs.org/
  if errorlevel 1 goto :failed
)

echo Building and validating the full website...
call npm run build
if errorlevel 1 goto :failed

start "" /b node scripts\open-browser.mjs
call npm run start:full
exit /b %errorlevel%

:failed
echo.
echo The portfolio could not start. Review the error shown above.
echo.
echo Quick repair option:
echo   rmdir /s /q node_modules frontend\node_modules backend\node_modules
echo   del package-lock.json frontend\package-lock.json backend\package-lock.json
pause
exit /b 1
