var libtorrent = require('../wrapper/libtorrent');
var path = require('path');

var session = new libtorrent.Session();
session.listen_on(6882, 6882, function(port) {
  console.log('Torrent client are literning at port: ' + port);

  // add torrent
  var infile = path.resolve(__dirname, 'test_data.txt');
  var outpath = path.resolve(__dirname);
  var t_handle_ptr = session.add_torrent(infile, outpath, 'KimThi', 'Testfile');

  console.log('Just added torrent: ' + t_handle_ptr);

  // find torrent
  var t_handle_ptr_1 = session.find_torrent(t_handle_ptr);
  console.log(t_handle_ptr);

  // var result = session.remove_torrent(t_handle_ptr_1);
  // console.log('Delete torrent: ' + result);

  var process = session.get_downloading_progress();
  console.log('Download Process .....');
  console.log('Seeding .....');
});
setTimeout(function() {
  console.log('Done!');
}, 30000);