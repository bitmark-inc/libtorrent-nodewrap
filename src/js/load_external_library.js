var ffi = require('ffi');
var path = require('path');

// get root dir
//var root_dir = __dirname.replace('/src/js', '/');
var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}
var boostSystem, boostThread, libtorrentRasterbar, libJson, libCurl;

// Load boost library and libtorrent library
if (ffi.LIB_EXT === '.so') {
  boostSystem = ffi.DynamicLibrary(root_dir + 'lib/linux/libboost_system' + ffi.LIB_EXT + '.1.54.0');
  boostThread = ffi.DynamicLibrary(root_dir + 'lib/linux/libboost_thread' + ffi.LIB_EXT + '.1.54.0');
  libtorrentRasterbar = ffi.DynamicLibrary(root_dir + 'lib/linux/libtorrent-rasterbar' + ffi.LIB_EXT + '.8');
  libJson = ffi.DynamicLibrary(root_dir + 'lib/linux/libjson' + ffi.LIB_EXT);
  libCurl = ffi.DynamicLibrary(root_dir + 'lib/linux/libcurl' + ffi.LIB_EXT);
} else {
  //OPENSSL
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\libeay32.dll');	
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\ssleay32.dll');
  //BOOST
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\boost_system-vc120-mt-1_58.dll');
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\boost_chrono-vc120-mt-1_58.dll');
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\boost_date_time-vc120-mt-1_58.dll');
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\boost_thread-vc120-mt-1_58.dll');
  
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\libcurl.dll');
  ffi.DynamicLibrary(root_dir + '\\lib\\window\\json_c.dll');

  ffi.DynamicLibrary(root_dir + '\\lib\\window\\libtorrent.dll');
}	