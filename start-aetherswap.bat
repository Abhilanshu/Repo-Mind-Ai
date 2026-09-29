@echo off
title AetherSwap — Powered by FaceFusion
set PATH=%CD%\.venv\Scripts;%PATH%
echo Launching AetherSwap Web Server on CUDA Acceleration...
.\.venv\Scripts\python.exe facefusion.py run --execution-providers cuda cpu --open-browser
pause
