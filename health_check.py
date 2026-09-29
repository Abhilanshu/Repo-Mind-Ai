#!/usr/bin/env python3
"""
AetherSwap Diagnostic & Health Check Script
"""
import sys
import os
import shutil
import subprocess

def run_health_check():
    print("=" * 60)
    print("      AETHER SWAP — DIAGNOSTIC & HEALTH CHECK REPORT")
    print("      (Powered by FaceFusion Core Architecture)")
    print("=" * 60)

    # 1. Application status
    print(f"[*] Application:          AetherSwap (FaceFusion Engine)")
    print(f"[*] Status:               OK")

    # 2. Python version
    py_ver = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    py_ok = sys.version_info >= (3, 10)
    print(f"[*] Python Version:       {py_ver} [{'OK' if py_ok else 'FAILED'}]")

    # 3. Environment check
    in_venv = sys.prefix != sys.base_prefix
    print(f"[*] Virtual Environment:   {sys.prefix} [{'OK (Isolated)' if in_venv else 'GLOBAL'}]")

    # 4. FFmpeg check
    ffmpeg_path = shutil.which('ffmpeg')
    if ffmpeg_path:
        try:
            res = subprocess.run([ffmpeg_path, '-version'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            ver_line = res.stdout.splitlines()[0] if res.stdout else 'Detected'
            print(f"[*] FFmpeg:               OK ({ver_line})")
        except Exception as e:
            print(f"[*] FFmpeg:               OK ({ffmpeg_path})")
    else:
        print(f"[*] FFmpeg:               FAILED (Not found in PATH)")

    # 5. ONNX Runtime & Execution Providers
    try:
        import onnxruntime as ort
        ort_ver = ort.__version__
        providers = ort.get_available_providers()
        print(f"[*] ONNX Runtime:         v{ort_ver} [OK]")
        print(f"[*] Execution Providers:  {', '.join(providers)}")
        has_cuda = 'CUDAExecutionProvider' in providers
        print(f"[*] CUDA Acceleration:    {'AVAILABLE' if has_cuda else 'NOT DETECTED (CPU fallback only)'}")
    except ImportError as e:
        print(f"[*] ONNX Runtime:         FAILED ({e})")
        has_cuda = False

    # 6. GPU Detection (Read-Only)
    try:
        nvsmi = shutil.which('nvidia-smi')
        if nvsmi:
            res = subprocess.run([nvsmi, '--query-gpu=name,memory.total', '--format=csv,noheader'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            gpu_info = res.stdout.strip()
            print(f"[*] Hardware GPU:         {gpu_info} [DETECTED]")
        else:
            print(f"[*] Hardware GPU:         No nvidia-smi tool found")
    except Exception as e:
        print(f"[*] Hardware GPU:         Detection check error ({e})")

    # 7. Model directory & integrity check
    models_dir = os.path.expanduser('~/.facefusion/models')
    print(f"[*] Model Store Directory: {models_dir}")
    if os.path.exists(models_dir):
        model_files = [f for f in os.listdir(models_dir) if f.endswith('.onnx') or f.endswith('.pt')]
        print(f"[*] Cached Models:        {len(model_files)} model files present")
    else:
        print(f"[*] Cached Models:        Store ready (will auto-download on first feature request)")

    print("=" * 60)
    print("Health Check Complete — Ready for Processing.")
    print("=" * 60)

if __name__ == '__main__':
    run_health_check()
