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

  var pd = ffi.Library(path.resolve(root_dir, 'src/cpp/peer_data'), {
    'new_peer_data': ['pointer', []],
    'set_peer_data': ['void', ['pointer', 'CString', 'CString', 'CString']],
    'add_bitmark_id': ['void', ['pointer', 'CString', 'CString']],
    'add_peer_pubkey': ['void', ['pointer', 'CString', 'CString']],
  }); 

  var PeerData = function() {
    var _pd = pd.new_peer_data();

    this._get_entry = function() {
      return _pd;
    };
    this.set_peer_data = function(sk, pk, s_url) {
      pd.set_peer_data(_pd, sk, pk, s_url);
    };
    this.add_bitmark_id = function(bitmarkId, infoHash) {
      pd.add_bitmark_id(_pd, bitmarkId, infoHash);
    };
    this.add_peer_pubkey = function(peerId, pk) {
      pd.add_peer_pubkey(_pd, peerId, pk);
    };
  };
  return PeerData;
};
