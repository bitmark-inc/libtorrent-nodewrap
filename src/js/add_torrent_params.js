var ffi = require('ffi');
var path = require('path');

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

    this._get_entry = function() {
      return _p;
    };

    var _self = this;

    Object.defineProperties(_self, {

      // Create setter function for AddTorrentParam;
      ti: {
        set: function(torrent_info_ptr) {
          add_torrent_params.set_ti(_p, torrent_info_ptr._get_entry());
        }
      },
      save_path: {
        set: function(data) {
          add_torrent_params.set_save_path(_p, data);
        }
      },
      url: {
        set: function(magnet_link) {
          add_torrent_params.set_url(_p, magnet_link);
        }
      },
      info_hash: {
        set: function(info_hash) {
          add_torrent_params.set_url(_p, info_hash);
        }
      },
      version: {
        set: function(data) {
          add_torrent_params.set_version(_p, data);
        }
      },
      name: {
        set: function(data) {
          add_torrent_params.set_name(_p, data);
        }
      },
      seed_mode: {
        set: function(data) {
          add_torrent_params.set_seed_mode(_p, data);
        }
      },
      trackerid: {
        set: function(data) {
          add_torrent_params.set_trackerid(_p, data);
        }
      },
      uuid: {
        set: function(data) {
          add_torrent_params.set_uuid(_p, data);
        }
      },
      source_feed_url: {
        set: function(data) {
          add_torrent_params.set_source_feed_url(_p, data);
        }
      },
      flags: {
        set: function(data) {
          add_torrent_params.set_flags(_p, data);
        }
      },
      max_uploads: {
        set: function(data) {
          add_torrent_params.set_max_uploads(_p, data);
        }
      },
      max_connections: {
        set: function(data) {
          add_torrent_params.set_max_connections(_p, data);
        }
      },
      upload_limit: {
        set: function(data) {
          add_torrent_params.set_upload_limit(_p, data);
        }
      },
      download_limit: {
        set: function(data) {
          add_torrent_params.set_download_limit(_p, data);
        }
      }
    });

    var _p = add_torrent_params.new_add_torrent_params();

    // Initial data when user passing an JSON object
    if (arguments.length === 1){
      var jsonObj = arguments[0];

      // fetch all of properties of input param and set for add_torrent_params object
      for(var key in jsonObj) {
        if (key in _self) {
          _self[key] = jsonObj[key];
        }
      }
    }
  };

  return AddTorrentParams;
};