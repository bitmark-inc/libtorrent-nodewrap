#!/bin/bash
echo "Config ...."
L_PATH="${PWD}/libraries/"
echo "Path of libraries: ${L_PATH}"
export LD_LIBRARY_PATH=$L_PATH
export DYLD_LIBRARY_PATH=$L_PATH
