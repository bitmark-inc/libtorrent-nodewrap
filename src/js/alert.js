var ffi = require('ffi');
var path = require('path');

// get root dir
var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}

module.exports = function() {

  var a = ffi.Library(path.resolve(root_dir, 'src/cpp/alert'), {
    'message': [ 'CString', ['pointer'] ],
    'category': [ 'int', ['pointer'] ],
    'what': [ 'CString', ['pointer'] ],
    'type': [ 'int', ['pointer'] ]
  });


  var Alert = function(alert) {
  	var _a = alert;

    this.get_entry = function() {
      return _a;
    };

    this.message = function() {
      return a.message(_a);
    };

    this.category = function() {
      return a.category(_a);
    };

    this.what = function() {
      return a.what(_a);
    };

    this.type = function() {
      return a.type(_a);
    };
  };

  return Alert;
};