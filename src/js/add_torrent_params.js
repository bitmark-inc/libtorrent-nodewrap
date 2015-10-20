var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var add_torrent_params = ffi.Library(path.resolve(root_dir, 'src/cpp/add_torrent_params'), {
	});


  var AddTorrentParams = function(session_status_ptr) {
  }

  return AddTorrentParams;
}();