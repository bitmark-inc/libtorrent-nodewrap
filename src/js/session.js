var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');
var session_status = require('./session_status');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var s = ffi.Library(path.resolve(root_dir, 'src/cpp/session'), {
    'get_session_ptr': [ 'pointer', [] ],
    'get_torrent_ptr': [ 'pointer', [] ],
    'get_torrent_index': [ 'pointer', [] ],
    'listen_on': [ 'int', ['pointer', 'int', 'int'] ],
    'add_torrent': [ 'pointer', ['pointer', 'pointer', 'CString', 'CString', 'CString', 'CString'] ],
    'create_magnet_uri': [ 'CString', ['CString', 'CString'] ],
    'start_dht': [ 'int', ['pointer'] ],
    'add_port_forwarding': [ 'int', ['pointer', 'int', 'int'] ],
    'find_torrent': [ 'pointer', ['pointer', 'pointer'] ],
    'remove_torrent': [ 'int', ['pointer', 'pointer'] ],
    'get_downloading_progress': [ 'double', ['pointer'] ],
    'get_torrent_state': [ 'int', ['pointer'] ],
    'get_info_hash': [ 'CString', ['pointer'] ],
    'find_torrent_info_hash': [ 'pointer', ['pointer', 'CString'] ],
    'add_torrent_by_maget_uri': [ 'pointer', ['pointer', 'CString', 'CString'] ],
    'add_url_seed': [ 'int', ['pointer', 'CString'] ],
    'get_name': [ 'CString', ['pointer'] ],
    'stop_session': [ 'int', ['pointer'] ],
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

    this.create_magnet_uri = function(infile, outpath) {
      return s.create_magnet_uri(infile, outpath);
    };

    this.add_torrent_by_maget_uri = function(savepath, magnet_uri) {

      // call add torrent info
      var th_ptr = s.add_torrent_by_maget_uri(_s, savepath, magnet_uri);

      return th_ptr;
    };

    this.add_url_seed = function(th_ptr, url_seed) {
      s.add_url_seed(th_ptr, url_seed);
    }

    this.get_name = function(th_ptr) {
      return s.get_name(th_ptr);
    }

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

    this.get_torrent_state = function(t_handle_ptr) {
      return s.get_torrent_state(t_handle_ptr);
    };

    this.get_info_hash = function(t_handle_ptr) {
      return s.get_info_hash(t_handle_ptr);
    };

    this.find_torrent_info_hash = function(t_index) {
       return s.find_torrent_info_hash(_s, t_index);
    };

    this.stop_session = function() {
      return s.stop_session(_s);
    };

    this.status = function() {
      return new session_status.SessionStatus(_s);
    }
  };

  var libtorrent = {
    Session: Session
  };

  return libtorrent;
}();