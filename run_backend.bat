@echo off
echo ========================================================
echo   Starting CareerPilot AI - FastAPI Backend API
echo ========================================================
cd /d "%~dp0"

if exist ".venv\Scripts\python.exe" (
    echo Using project virtual environment .venv
    cd careerpilot-ai\backend
    ..\..\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
) else (
    echo Virtualenv .venv not found, trying system python
    cd careerpilot-ai\backend
    python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
)
pause
