var ffi = require('ffi');
var ref = require('ref');
var path = require('path');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var ti = ffi.Library(path.resolve(root_dir, 'src/cpp/torrent_info'), {
    'new_torrent_info_entry': ['pointer', ['pointer']],
    'new_torrent_info_filename': ['pointer', ['CString', 'int']],
    'new_torrent_info_hash': ['pointer', ['CString', 'int']],
    'new_torrent_info_torrent_buffer': ['pointer', ['pointer', 'int', 'int']],
    'create_magnet_uri': ['CString', ['pointer']]
  });


  var TorrentInfo = function() {
    var _ti;

    // Check condition to mapping constructor function
    if (arguments.length === 1) {
      _ti = ti.new_torrent_info_entry(arguments[0]);
    } else if (arguments.length === 2){
      if (typeof arguments[0] === "string") {
        _ti = ti.new_torrent_info_filename(arguments[0], parseInt(arguments[1]));
      } else if (arguments[0] instanceof Buffer) {
        _ti = ti.new_torrent_info_hash(arguments[0], parseInt(arguments[1]));
      }
    } else if (arguments.length === 3) {
      _ti = ti.new_torrent_info_torrent_buffer(arguments[0], parseInt(arguments[1]), parseInt(arguments[2]));
    }

    this.create_magnet_uri = function() {
      return ti.create_magnet_uri(_ti);
    };

    this._get_entry = function() {
      return _ti;
    };
  };

  return TorrentInfo;
};