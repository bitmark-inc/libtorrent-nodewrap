var libtorrent = require('../wrapper/libtorrent');
var cluster = require('cluster');
// session.add_torrent(infile, outpath, 'Kim Thi', 'Test file');

// libtorrent._tmp();

var session = new libtorrent.session();;

if (cluster.isMaster) {
  session.listen_on(6882, 6882);

  console.log('Listen on.....');

  // s.add_torrent(infile, outpath, seeder, desc);
  var worker = cluster.fork();

  setTimeout(function() {
    worker.send(JSON.stringify({
      message: 'add:torrent'
    }));
  }, 1000);

  setTimeout(function() {
    console.log('Done');
  }, 2000);

  setTimeout(function() {
    console.log('Stoping Seeding');
    session.stop_seeding();
  }, 2000);
} else {
  process.on('message', function(message, connection) {
    if (message !== 'add:torrent') {
      var infile = '/home/vagrant/libtorrent/test/test_data.txt';
      var outpath = '/home/vagrant/libtorrent/test/';
      session.add_torrent(infile, outpath, 'Kim Thi', 'Test file');
    }
  });
}

// while(true) {
//   console.log('aaaa');
// }