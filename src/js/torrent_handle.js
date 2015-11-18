var ffi = require('ffi');
var path = require('path');
var TorrentStatus = require('./torrent_status')();

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var th = ffi.Library(path.resolve(root_dir, 'src/cpp/torrent_handle'), {
    'add_url_seed': [ 'void', ['pointer', 'CString'] ],
    'is_valid': [ 'bool', ['pointer'] ],
    'info_hash': [ 'CString', ['pointer'] ],
    'status': [ 'pointer', ['pointer'] ],
    'name': [ 'pointer', ['CString'] ],
    'connect_peer': [ 'void', ['pointer', 'CString', 'int', 'int'] ]
  });


  var TorrentHandle = function(torrent_handle) {
  	var _th = torrent_handle;

    this.get_entry = function() {
      return _th;
    };

    this.is_valid = function() {
      return th.is_valid(_th);
    };

    this.info_hash = function() {
      return th.info_hash(_th);
    };

    this.status = function() {
      var ts = th.status(_th);
      return new TorrentStatus(ts);
    };

    this.add_url_seed = function(url) {
      th.add_url_seed(_th, url);
    };

    this.name = function() {
      th.name(_th);
    };

    this.connect_peer = function(addr, port, source) {
      th.connect_peer(_th, addr, port, source);
    };
  };

  return TorrentHandle;
};