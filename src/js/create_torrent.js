var ffi = require('ffi');
var ref = require('ref');
var path = require('path');

// get root dir
var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}

module.exports = function() {

  var ct = ffi.Library(path.resolve(root_dir, 'src/cpp/create_torrent'), {
    'new_create_torrent': [ 'pointer', ['pointer'] ],
    'set_piece_hashes': ['void', ['pointer', 'CString']],
    'bencode': ['pointer', ['pointer']],
    'generate': ['pointer', ['pointer']],
    'set_comment': ['void', ['pointer', 'CString']],
    'set_creator': ['void', ['pointer', 'CString']],
    // 'set_file_hash': ['void', ['pointer', 'CString']], TODO
    'add_url_seed': ['void', ['pointer', 'CString']],
    'add_http_seed': ['void', ['pointer', 'CString']],
  });

  var CreateTorrent = function(file_storage) {
    var _ct = ct.new_create_torrent(file_storage._get_entry());

    this.set_piece_hashes = function(outpath) {
      ct.set_piece_hashes(_ct, outpath);
    };

    this.async_set_piece_hashes = function(outpath, callback) {
      ct.set_piece_hashes.async(_ct, outpath, function(err, res){
        if (callback) {
          callback(res);
        }
      });
    };

    this.bencode = function() {
      var bencode = ct.bencode(_ct);
      return bencode;
    };

    this.generate = function() {
      return ct.generate(_ct);
    };

    this.set_comment = function(comment) {
      ct.set_comment(_ct, comment);
    };
    this.set_creator = function(creator) {
      ct.set_creator(_ct, creator);
    };
    this.add_url_seed = function(url) {
      ct.add_url_seed(_ct, url);
    };
    this.add_http_seed = function(http_url) {
      ct.add_http_seed(_ct, http_url);
    };
  };

  return CreateTorrent;
};