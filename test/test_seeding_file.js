var session = require('../src/js/session');
var path = require('path');

var session = new session.Session();
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

  // var sessionStatus = session.get_session_status_ptr();
  // console.log('sessionStatus: ' + sessionStatus.upload_rate);

  session.start_dht();
  session.add_port_forwarding(6882, 6882);

  var sessionStatus = session.status();
  console.log('sessionStatus: ' + sessionStatus.total_upload);
  if (sessionStatus.has_incoming_connections == true) {
    console.log('Someone are connecting your server...');
  }

  console.log('Seeding ..... ');
});
setTimeout(function() {
  session.stop_session();
  console.log('Done!');
}, 1000);