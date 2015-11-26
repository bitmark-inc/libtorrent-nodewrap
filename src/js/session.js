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
    'stop_session': [ 'int', ['pointer'] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer'] ],
    'start_dht': [ 'int', ['pointer'] ],
    'add_port_mapping': [ 'int', ['pointer', 'int', 'int'] ],
    'start_upnp': [ 'int', ['pointer'] ],
    'start_natpmp': [ 'int', ['pointer'] ],
    'listen_port': [ 'short', ['pointer'] ],
    'add_extension': [ 'void', ['pointer', 'pointer'] ],
    'add_dht_node': [ 'void', ['pointer', 'CString', 'int'] ],
    'pop_alert': ['pointer', ['pointer']]
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
      return s.start_dht(_s);
    };

    this.add_port_mapping = function(_min, _max) {
      return s.add_port_mapping(_s, _min, _max);
    };

    this.start_upnp = function() {
      return s.start_upnp(_s);
    };

    this.start_natpmp = function() {
      return s.start_natpmp(_s);
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