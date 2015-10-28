var ffi = require('ffi');
var ref = require('ref');
var path = require('path');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var p = ffi.Library(path.resolve(root_dir, 'src/cpp/plugin'), {
    'new_bitmark_plugin': ['pointer', []],
    'set_bitmark_peer_data': ['void', ['pointer', 'pointer']],
    'get_create_bitmark_plugin_function': ['pointer', ['pointer']]
  });

  var ExtensionImpl = function() {
    var _p = p.new_bitmark_plugin();

    this.set_bitmark_peer_data = function(peer_data) {
      p.set_peer_data(_ei, peer_data);
    };
    this.get_create_bitmark_plugin_function = function() {
      return p.get_create_bitmark_plugin_function(_p);
    };
  };

  return ExtensionImpl;
}