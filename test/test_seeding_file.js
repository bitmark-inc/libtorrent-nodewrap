var libtorrent = require('../wrapper/libtorrent');
var path = require('path');

var session = new libtorrent.Session();
session.listen_on(6882, 6882, function(port) {
  console.log('Torrent client are literning at port: ' + port);

  // add torrent
  var infile = '/Users/thinhuockim/Documents/project/bitmark/libtorrent-nodewrap/test/data';
  // var infile = path.resolve(__dirname, 'precise64.box'); // lagger file
  var outpath = path.resolve(__dirname);
  var t_handle_ptr = session.add_torrent(infile, outpath, 'KimThi', 'Testfile');

  // find torrent
  var t_handle_ptr_2 = session.find_torrent(t_handle_ptr);
  console.log('t_handle_ptr_2: ' + t_handle_ptr_2);

  var process = session.get_downloading_progress(t_handle_ptr);
  console.log('Download Process ..... ' + process);
});
setTimeout(function() {
  console.log('Done!');
}, 30000);