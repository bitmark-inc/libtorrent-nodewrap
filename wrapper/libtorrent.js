var ffi = require('../lib/ffi');
var ref = require('ref');
var path = require('path');

module.exports = function() {

  var root_dir = __dirname.replace('/wrapper', '/');
  var s = ffi.Library(path.resolve(root_dir, 'libtorrent/src/session'), {
    'new_session': [ 'pointer', [] ],
    'listen_on': [ 'int', ['int', 'int'] ],
    'add_torrent': [ 'void', ['CString', 'CString', 'CString', 'CString'] ],
    'stop_seeding': ['int', []]
  });

  var session = function() {
    // var _s = s.new_session();

    this.listen_on = function(fromPort, toPort) {
      s.listen_on(fromPort, toPort);
    }

    this.add_torrent = function(infile, outpath, seeder, desc) {
      s.add_torrent(infile, outpath, seeder, desc);
    }

    this.stop_seeding = function() {
      s.stop_seeding();
    }
  }

  var libtorrent = {
    session: session
  }

  return libtorrent;
}()