var ffi = require('ffi');
var path = require('path');

// get root dir
var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}

module.exports = function() {

  var ts = ffi.Library(path.resolve(root_dir, 'src/cpp/torrent_status'), {
    'get_progress': [ 'double', ['pointer'] ],
    'get_state': [ 'int', ['pointer'] ],
    'name': [ 'CString', ['pointer'] ]
  });

  var TorrentHandle = function(torrent_status) {
  	var _ts = torrent_status;
    this.progress = ts.get_progress(_ts);
    this.state = ts.get_state(_ts);
    this.name = ts.name(_ts);
  };

  return TorrentHandle;
};