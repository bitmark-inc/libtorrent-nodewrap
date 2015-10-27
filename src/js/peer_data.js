var ffi = require('ffi');
var ref = require('ref');
var path = require('path');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var ei = ffi.Library(path.resolve(root_dir, 'src/cpp/peer_data'), {
  	'new_peer_data': ['pointer', []],
  	'set_peer_data': ['void', ['pointer', 'CString']],
  	'parse_peer_data': ['void', ['pointer']],
    'new_bitmark_plugin': ['pointer', []],
    'set_bitmark_peer_data': ['void', ['pointer', 'pointer']],
    'get_create_bitmark_plugin_function': ['pointer', ['pointer']]
  });

  var ExtensionImpl = function() {
    var _ei = ei.new_peer_data();

    this.set_peer_data = function(data) {
      ei.set_peer_data(_ei, data);
    };
    this.parse_peer_data = function() {
      ei.set_peer_data(_ei);
    };
  };

  return ExtensionImpl;
}