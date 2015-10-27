var ffi = require('ffi');
var path = require('path');
var TorrentHandle = require('./torrent_handle');
var AddTorrentParam = require('./add_torrent_params');
var ExtensionImpl = require('./extension_impl');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var s = ffi.Library(path.resolve(root_dir, 'src/cpp/session'), {
    'new_session': [ 'pointer', [] ],
    'stop_session': [ 'int', ['pointer'] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer'] ],
    'start_dht': [ 'int', ['pointer'] ],
    'add_port_forwarding': [ 'int', ['pointer', 'int', 'int'] ],
    'listen_port': [ 'short', ['pointer'] ],
    'add_extension': [ 'void', ['pointer', 'pointer'] ]
  });

  var Session = function() {
    var _s = s.new_session();
    var _torrent_infos = [];

    this.stop_session = function() {
      return s.stop_session(_s);
    };

    this.listen_on = function(fromPort, toPort) {
      var port = s.listen_on(_s, fromPort, toPort);
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

    this.start_dht = function() {
      return s.start_dht(_s);
    };

    this.add_port_forwarding = function(_min, _max) {
      return s.add_port_forwarding(_s, _min, _max);
    };

    this.listen_port = function() {
      return s.listen_port(_s);
    };

    this.add_extension = function() {
      var extension_impl = new ExtensionImpl();
      var peer_data = extension_impl.new_peer_data();
      s.add_extension(_s, peer_data);
    };
  };

  return Session;
}();