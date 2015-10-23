var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');
var TorrentHandle = require('./torrent_handle');
var AddTorrentParam = require('./add_torrent_params')

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var s = ffi.Library(path.resolve(root_dir, 'src/cpp/session'), {
    'new_session': [ 'pointer', [] ],
    'stop_session': [ 'int', ['pointer'] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer'] ]
  });

  var Session = function() {
    var _s = s.new_session();
    var _torrent_infos = [];

    this.stop_session = function() {
      return s.stop_session(_s);
    };

    this.listen_on = function(fromPort, toPort, callback) {
      var port = s.listen_on(_s, fromPort, toPort);
      callback(port);
    };

    this.add_torrent = function(params) {
      var add_torrent_params;
      if (params instanceof AddTorrentParam) {
        add_torrent_params = params;
      } else {
        add_torrent_params = (new AddTorrentParam(params));
      }

      var th = s.add_torrent(_s, add_torrent_params._get_entry());
      return new TorrentHandle(th);
    };
  };

  var libtorrent = {
    Session: Session
  };

  return libtorrent;
}();