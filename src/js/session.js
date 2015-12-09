var ffi = require('ffi');
var path = require('path');
var TorrentHandle = require('./torrent_handle')();
var AddTorrentParam = require('./add_torrent_params')();
var Alert = require('./alert')();

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var s = ffi.Library(path.resolve(root_dir, 'src/cpp/session'), {
    'new_session': [ 'pointer', [] ],
    'stop_session': [ 'void', ['pointer'] ],
    'listen_on': [ 'void', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer'] ],
    'start_dht': [ 'void', ['pointer'] ],
    'add_port_mapping': [ 'void', ['pointer', 'int', 'int', 'int'] ],
    'start_upnp': [ 'void', ['pointer'] ],
    'start_natpmp': [ 'void', ['pointer'] ],
    'listen_port': [ 'short', ['pointer'] ],
    'add_extension': [ 'void', ['pointer', 'pointer'] ],
    'add_dht_node': [ 'void', ['pointer', 'CString', 'int'] ],
    'pop_alert': ['pointer', ['pointer']]
  });

  var Session = function() {
    var _s = s.new_session();
    var _torrent_infos = [];

    this.stop_session = function() {
      s.stop_session(_s);
    };

    this.listen_on = function(fromPort, toPort) {
      s.listen_on(_s, fromPort, toPort);
    };

    this.add_torrent = function(params) {
      var add_torrent_params;
      if (params instanceof AddTorrentParam) {
        add_torrent_params = params;
      } else {
        add_torrent_params = (new AddTorrentParam(params));
      }

      console.log(add_torrent_params);

      var th = s.add_torrent(_s, add_torrent_params._get_entry());
      return new TorrentHandle(th);
    };

    this.async_add_torrent = function(params, callback) {
      var add_torrent_params;
      if (params instanceof AddTorrentParam) {
        add_torrent_params = params;
      } else {
        add_torrent_params = (new AddTorrentParam(params));
      }

      console.log(add_torrent_params);

      var th = s.add_torrent.async(_s, add_torrent_params._get_entry(), function(err, res) {
        callback(new TorrentHandle(res));
      });
    };

    this.start_dht = function() {
      s.start_dht(_s);
    };

    this.add_port_mapping = function(protocol_type, internal_port, external_port) {
      s.add_port_mapping(_s, protocol_type, internal_port, external_port);
    };

    this.start_upnp = function() {
      s.start_upnp(_s);
    };

    this.start_natpmp = function() {
      s.start_natpmp(_s);
    };

    this.listen_port = function() {
      return s.listen_port(_s);
    };

    this.add_extension = function(peer_data) {
      s.add_extension(_s, peer_data._get_entry());
    };

    this.add_dht_node = function(addr, port) {
      s.add_dht_node(_s, addr, port);
    };

    this.pop_alert = function() {
      var alert = s.pop_alert(_s);
      return new Alert(alert);
    };
  };

  return Session;
};