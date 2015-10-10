var ffi = require('../lib/ffi');
var ref = require('ref');
var path = require('path');

module.exports = function() {

  var root_dir = __dirname.replace('/wrapper', '/');
  var s = ffi.Library(path.resolve(root_dir, 'libtorrent/src/session'), {
    'get_session_ptr': [ 'pointer', [] ],
    'get_torrent_ptr': [ 'pointer', [] ],
    'get_torrent_index': [ 'pointer', [] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer', 'CString', 'CString', 'CString', 'CString'] ],
    'start_dht': [ 'int', ['pointer'] ],
    'add_port_forwarding': [ 'int', ['pointer', 'int', 'int'] ],
    'find_torrent': [ 'pointer', ['pointer', 'pointer'] ],
    'remove_torrent': [ 'int', ['pointer', 'pointer'] ],
    'get_downloading_progress': [ 'int', ['pointer'] ],
  });

  var Session = function() {
    var _s = s.get_session_ptr();
    var _torrent_infos = [];

    this.listen_on = function(fromPort, toPort, callback) {
      var port = s.listen_on(_s, fromPort, toPort);
      callback(port);
    };

    this.add_torrent = function(infile, outpath, creator, comments) {
      var ti = s.get_torrent_ptr();

      // call add torrent info
      var th_ptr = s.add_torrent(_s, ti, infile, outpath, creator, comments);

      // add torrent info into torrent_infos list
      _torrent_infos.push(ti);

      return th_ptr;
    };

    this.start_dht = function() {
      s.start_dht(_s);
    };

    this.add_port_forwarding = function(fromPort, toPort) {
      s.add_port_forwarding(_s, fromPort, toPort);
    };

    this.get_torrent_infos = function() {
      return _torrent_infos;
    };

    this.find_torrent = function(t_handle_ptr) {
      var torrent_handle = s.find_torrent(_s, t_handle_ptr);
      return torrent_handle;
    };

    this.remove_torrent = function(t_handle_ptr) {
      return s.remove_torrent(_s, t_handle_ptr);
    };

    this.get_downloading_progress = function(t_handle_ptr) {
      return s.get_downloading_progress(t_handle_ptr);
    };
  };

  var libtorrent = {
    Session: Session
  };

  return libtorrent;
}();