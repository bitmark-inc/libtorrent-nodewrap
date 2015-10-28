var ffi = require('ffi');
var ref = require('ref');
var path = require('path');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var pd = ffi.Library(path.resolve(root_dir, 'src/cpp/peer_data'), {
  	'new_peer_data': ['pointer', []],
  	'set_peer_data': ['void', ['pointer', 'CString']],
  	'parse_peer_data': ['void', ['pointer']]
  });

  var PeerData = function() {
    var _pd = pd.new_peer_data();

    this._get_entry = function() {
      return _pd;
    }
    this.set_peer_data = function(data) {
      pd.set_peer_data(_pd, data);
    };
    this.parse_peer_data = function() {
      pd.set_peer_data(_pd);
    };
  };

  return PeerData;
}();