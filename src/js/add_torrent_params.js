var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var add_torrent_params = ffi.Library(path.resolve(root_dir, 'src/cpp/add_torrent_params'), {
    'new_add_torrent_params': [ 'pointer', [] ],
    'set_ti': [ 'void', ['pointer', 'pointer'] ],
    'set_url': [ 'void', ['pointer', 'CString'] ],
    'set_info_hash': [ 'void', ['pointer', 'CString'] ],
    'set_version': [ 'void', ['pointer', 'int'] ],
    'set_name': [ 'void', ['pointer', 'CString'] ],
    'set_save_path': [ 'void', ['pointer', 'CString'] ],
    'set_seed_mode': [ 'void', ['pointer', 'bool'] ],
    'set_trackerid': [ 'void', ['pointer', 'CString'] ],
    'set_uuid': [ 'void', ['pointer', 'CString'] ],
    'set_source_feed_url': [ 'void', ['pointer', 'CString'] ],
    'set_flags': [ 'void', ['pointer', 'uint64'] ],
    'set_max_uploads': [ 'void', ['pointer', 'int'] ],
    'set_max_connections': [ 'void', ['pointer', 'int'] ],
    'set_upload_limit': [ 'void', ['pointer', 'int'] ],
    'set_download_limit': [ 'void', ['pointer', 'int'] ],
	});


  var AddTorrentParams = function() {

    // new add_torrent_params
    var _p = add_torrent_params.new_add_torrent_params();

    this.get_entry = function() {
      return _p;
    }
    this.set_ti = function(torrent_info_ptr) {
      add_torrent_params.set_ti(_p, torrent_info_ptr);
    }
    this.set_url = function(magnet_link) {
      add_torrent_params.set_url(_p, magnet_link);
    };
    this.set_info_hash = function(info_hash) {
      add_torrent_params.set_url(_p, info_hash);
    };
    this.set_version = function(data) {
      add_torrent_params.set_version(_p, data);
    };
    this.set_name = function(data) {
      add_torrent_params.set_name(_p, data);
    };
    this.set_save_path = function(data) {
      add_torrent_params.set_save_path(_p, data);
    };
    this.set_seed_mode = function(data) {
      add_torrent_params.set_seed_mode(_p, data);
    }
    this.set_trackerid = function(data) {
      add_torrent_params.set_trackerid(_p, data);
    };
    this.set_uuid = function(data) {
      add_torrent_params.set_uuid(_p, data);
    };
    this.set_source_feed_url = function(data) {
      add_torrent_params.set_source_feed_url(_p, data);
    };
    this.set_flags = function(data) {
      add_torrent_params.set_flags(_p, data);
    };
    this.set_max_uploads = function(data) {
      add_torrent_params.set_max_uploads(_p, data);
    };
    this.set_max_connections = function(data) {
      add_torrent_params.set_max_connections(_p, data);
    };
    this.set_upload_limit = function(data) {
      add_torrent_params.set_upload_limit(_p, data);
    };
    this.set_download_limit = function(data) {
      add_torrent_params.set_download_limit(_p, data);
    };
  }

  return AddTorrentParams;
}();