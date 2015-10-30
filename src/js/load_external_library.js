var ffi = require('ffi');
var path = require('path');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');
var boostSystem, boostThread, libtorrentRasterbar;

// Load boost library and libtorrent library
if (ffi.LIB_EXT === '.so') {
  boostSystem = ffi.DynamicLibrary(root_dir + 'lib/linux/libboost_system' + ffi.LIB_EXT + '.1.54.0');
  boostThread = ffi.DynamicLibrary(root_dir + 'lib/linux/libboost_thread' + ffi.LIB_EXT + '.1.54.0');
  libtorrentRasterbar = ffi.DynamicLibrary(root_dir + 'lib/linux/libtorrent-rasterbar' + ffi.LIB_EXT + '.8');
}