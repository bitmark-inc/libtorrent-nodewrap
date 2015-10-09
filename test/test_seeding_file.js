var libtorrent = require('../wrapper/libtorrent');
var path = require('path');

var session = new libtorrent.Session();
session.listen_on(6882, 6882, function(port) {
  console.log('Torrent client are literning at port: ' + port);

  var infile = path.resolve(__dirname, 'test_data.txt');
  var outpath = path.resolve(__dirname);
  session.add_torrent(infile, outpath, 'KimThi', 'Testfile');

  console.log('Seeding .....');
});
setTimeout(function() {
  console.log('Done!');
}, 30000);