@echo off
title AetherSwap Setup & Verification
echo ============================================================
echo      Setting up AetherSwap (Powered by FaceFusion)
echo ============================================================
echo.

set PATH=%CD%\.venv\Scripts;%PATH%

if not exist .venv (
    echo Creating isolated Python 3.12 environment...
    py -3.12 -m venv .venv
)

echo Installing dependencies and CUDA acceleration...
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pip install onnxruntime-gpu==1.24.4

echo.
echo Running Health Diagnostic...
.\.venv\Scripts\python.exe health_check.py

echo.
echo Setup completed successfully!
pause
