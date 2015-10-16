var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.Session();
session.listen_on(6882, 6882, function(port) {
  console.log('Torrent client are literning at port: ' + port);

  // add torrent
  var infile = '/home/vagrant/libtorrent/test/data/';
  // var infile = '/Users/thinhuockim/Documents/project/bitmark/libtorrent-nodewrap-MAC/test/data';
  // var infile = path.resolve(__dirname, 'data/test_data.txt'); // lagger file
  var outpath = path.resolve(__dirname);

  // create magnet link
  var magnetUrl = session.create_magnet_uri(infile, outpath);

  console.log(magnetUrl);

  var t_handle_ptr = session.add_torrent(infile, outpath, 'KimThi', 'Testfile');

  // find torrent
  // var t_handle_ptr_2 = session.find_torrent(t_handle_ptr);
  // console.log('t_handle_ptr_2: ' + t_handle_ptr_2);

  session.start_dht();
  session.add_port_forwarding(6882, 6882);

  console.log('Sedding ..... ');
});
setTimeout(function() {
  console.log('Done!');
}, 300000);