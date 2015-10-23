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
    'rename_file': ['void', ['pointer', 'CString']],
    'num_files': ['int', ['pointer']],
    'at': ['pointer', ['pointer', 'int']]
  });


  var FileStorage = function() {

    // New file storage pointer
    var _fs = fs.new_file_storage();

    // Setter functions
    this._get_entry = function() {
      return _fs;
    };
    this.rename_file = function(new_filename) {
      fs.rename_file(_fs, new_filename);
    };

    // getter functions
    this.add_file = function(dataPath) {
      fs.add_file_ipml(_fs, dataPath);
    };
    this.file_name_ptr = function(index) {
      return fs.file_name_ptr(_fs, index);
    };
    this.file_name_len = function(index) {
      return fs.file_name_len(_fs, index);
    };
    this.num_files = function() {
      return fs.num_files(_fs);
    };
    this.at = function(index) {
      return fs.at(_fs, index);
    };
  }

  return FileStorage;
}();