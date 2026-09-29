#!/usr/bin/env python3

import os

os.environ['OMP_NUM_THREADS'] = '1'

# Automatically register NVIDIA CUDA DLL directories for ONNX Runtime GPU provider
import sys
import glob
site_pkgs = os.path.join(sys.prefix, 'Lib', 'site-packages')
nvidia_dir = os.path.join(site_pkgs, 'nvidia')
if os.path.exists(nvidia_dir):
    for sub in os.listdir(nvidia_dir):
        bin_path = os.path.join(nvidia_dir, sub, 'bin')
        if os.path.exists(bin_path):
            if hasattr(os, 'add_dll_directory'):
                try:
                    os.add_dll_directory(bin_path)
                except Exception:
                    pass
            os.environ['PATH'] = bin_path + os.pathsep + os.environ['PATH']

from facefusion import conda, core

if __name__ == '__main__':
	conda.setup()
	core.cli()
