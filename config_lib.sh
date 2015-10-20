#!/bin/bash
echo "Config ...."
DYLD_PATH="${PWD}/Contents/Resources/app.nw/node_modules/"
echo "Path of libraries: ${DYLD_PATH}"
echo "export DYLD_LIBRARY_PATH=${DYLD_PATH}" >> ~/.bashrc
. ~/.bashrc