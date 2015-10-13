echo "Rebuild ...."
node-gyp rebuild

echo "Config ...."
L_PATH="${PWD}/libraries/"
echo $L_PATH
echo "export LD_LIBRARY_PATH=${L_PATH}" >> ~/.bashrc
exec bash
