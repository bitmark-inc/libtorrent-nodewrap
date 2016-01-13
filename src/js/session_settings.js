var ffi = require('ffi');
var path = require('path');

var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}

module.exports = function() {
	var ss = ffi.Library(path.resolve(root_dir, 'src/cpp/session_settings'), {
    	'set_ban_web_seeds': [ 'void', ['pointer', 'bool'] ],
    	'get_ban_web_seeds': [ 'bool', ['pointer'] ]
	});

	var SessionSettings = function(setting) {
		var _setting = setting;

		this.get_entry = function() {
			return _setting;
		};
		
		this.set_ban_web_seeds = function(isBan) {
			ss.set_ban_web_seeds(_setting, isBan);
		}

		this.get_ban_web_seeds = function() {
			return ss.get_ban_web_seeds(_setting);
		}
			
	};

	return SessionSettings;
};