var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var add_torrent_params = ffi.Library(path.resolve(root_dir, 'src/cpp/add_torrent_params'), {
    'new_add_torrent_params': [ 'pointer', [] ],
    'set_version': [ 'void', ['pointer', 'int'] ],
    'set_name': [ 'void', ['pointer', 'CString'] ],
    'set_save_path': [ 'void', ['pointer', 'CString'] ],
    'set_trackerid': [ 'void', ['pointer', 'CString'] ],
    'set_url': [ 'void', ['pointer', 'CString'] ],
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

    this.set_version = function(data) {
      add_torrent_params.set_version(data);
    };
    this.set_name = function(data) {
      add_torrent_params.set_name(data);
    };
    this.set_save_path = function(data) {
      add_torrent_params.set_save_path(data);
    };
    this.set_trackerid = function(data) {
      add_torrent_params.set_trackerid(data);
    };
    this.set_url = function(data) {
      add_torrent_params.set_url(data);
    };
    this.set_uuid = function(data) {
      add_torrent_params.set_uuid(data);
    };
    this.set_source_feed_url = function(data) {
      add_torrent_params.set_source_feed_url(data);
    };
    this.set_flags = function(data) {
      add_torrent_params.set_flags(data);
    };
    this.set_max_uploads = function(data) {
      add_torrent_params.set_max_uploads(data);
    };
    this.set_max_connections = function(data) {
      add_torrent_params.set_max_connections(data);
    };
    this.set_upload_limit = function(data) {
      add_torrent_params.set_upload_limit(data);
    };
    this.set_download_limit = function(data) {
      add_torrent_params.set_download_limit(data);
    };
  }

  return AddTorrentParams;
}();