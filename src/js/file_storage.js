var ffi = require('ffi');
var path = require('path');
var external_lib = require('./load_external_library');

// get root dir
var root_dir = __dirname.replace('/src/js', '/');

module.exports = function() {

  var fs = ffi.Library(path.resolve(root_dir, 'src/cpp/file_storage'), {
    'new_file_storage': ['pointer', []],
    'add_file_ipml': ['void', ['pointer', 'CString']],
    'file_name_ptr': ['CString', ['pointer', 'int']],
    'file_name_len': ['CString', ['pointer', 'int']],
  });


  var FileStorage = function() {
    var _fs = fs.new_file_storage();
    this.get_entry = function() {
      return _fs;
    };

    this.add_file = function(infile) {
      fs.add_file_ipml(_fs, infile);
    };
    this.file_name_ptr = function(index) {
      return fs.file_name_ptr(_fs, index);
    };
    this.file_name_len = function(index) {
      return fs.file_name_len(_fs, index);
    };
  }

  return FileStorage;
}();