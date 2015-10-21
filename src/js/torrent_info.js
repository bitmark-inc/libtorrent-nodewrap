var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var ti = ffi.Library(path.resolve(root_dir, 'src/cpp/torrent_info'), {
    'new_torrent_info': ['pointer', ['pointer']],
    'create_magnet_uri': ['CString', ['pointer']]
  });


  var TorrentInfo = function(torrent_file, flags) {
    var _ti = ti.new_torrent_info(torrent_file);

    this.create_magnet_uri = function() {
      return ti.create_magnet_uri(_ti);
    };
  }

  return TorrentInfo;
}();