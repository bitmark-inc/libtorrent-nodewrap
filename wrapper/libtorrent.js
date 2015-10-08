var ffi = require('../lib/ffi');
var ref = require('ref');
var path = require('path');

module.exports = function() {

  var root_dir = __dirname.replace('/wrapper', '/');
  var s = ffi.Library(path.resolve(root_dir, 'libtorrent/src/session'), {
    'get_session_ptr': [ 'pointer', [] ],
    'get_torrent_ptr': [ 'pointer', [] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'void', ['pointer', 'pointer', 'CString', 'CString', 'CString', 'CString'] ],
    'start_dht': [ 'int', ['pointer'] ],
    'add_port_forwarding': [ 'int', ['pointer', 'int', 'int'] ],
  });

  var Session = function() {
    var _s = s.get_session_ptr();
    var _ti = s.get_torrent_ptr();

    this.listen_on = function(fromPort, toPort, callback) {
      var port = s.listen_on(_s, fromPort, toPort);
      callback(port);
    }

    this.add_torrent = function(infile, outpath, seeder, desc) {
      s.add_torrent(_s, _ti, infile, outpath, seeder, desc);
    }

    this.start_dht = function() {
      s.start_dht(_s);
    }

    this.add_port_forwarding = function(fromPort, toPort) {
      s.add_port_forwarding(_s, fromPort, toPort);
    }
  }

  var libtorrent = {
    Session: Session
  }

  return libtorrent;
}()