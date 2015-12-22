var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.session();
session.listen_on(6882, 6882);

console.log('Torrent client are literning at port: ' + session.listen_port());

var file_storage = new libtorrent.file_storage();
// for window
var dataPath = 'D:/node_modules/libtorrent-nodewrap/examples/data';
var pieceHashPath = 'D:/node_modules/libtorrent-nodewrap/examples';
// for VM
//var dataPath = '/home/vagrant/libtorrent/examples/data';
//var pieceHashPath = '/home/vagrant/libtorrent/examples';
// for MAC OS
// var dataPath = '/Users/thinhuockim/Documents/project/bitmark/libtorrent-nodewrap/examples/data';
// var pieceHashPath = '/Users/thinhuockim/Documents/project/bitmark/libtorrent-nodewrap/examples';

// add files into file_storage
console.log('--------------------------------------');
console.log('Create torrent_info from torrent_entry');
file_storage.add_file(dataPath);

console.log('File Name:', file_storage.file_name_ptr(0));
console.log('Number of files:', file_storage.num_files());

// create torrent
console.log('Create create_torrent');
var create_torrent = new libtorrent.create_torrent(file_storage);
create_torrent.set_comment('Comment');
create_torrent.set_creator('Creator');
create_torrent.async_set_piece_hashes(pieceHashPath, function() {
  // Generate Torrent file
  console.log('Create torrent_file');

  var torrent_file = create_torrent.generate();
  var torrent_info = new libtorrent.torrent_info(torrent_file);

  console.log('Create magnet_link');
  var magnet_link = torrent_info.make_magnet_uri();
  console.log('magnet link = ', magnet_link);

  console.log('--------------Add Torrent Param------------------------');
  // var params = new AddTorrentParam({
  //   ti: torrent_info,
  //   save_path: pieceHashPath,
  //   seed_mode: true,
  // });
  // var params = new AddTorrentParam();
  // params.ti = torrent_info;
  // params.save_path = pieceHashPath;
  // params.seed_mode = true;

  console.log('--------------Add Torrent Into the session and Seed------------------------');
  session.start_dht();
  session.add_port_mapping(2, 6882, 6882);
  session.start_upnp();

  // console.log('--------------Add Torrent Torrent extension into the session------------------------');
  // var peer_data = new libtorrent.peer_data();
  // var pubkey = "d5182f5aeaba93a79793473cd2b15fffea37f0b3ec51c57984d7d86e4430a832";
  // var prikey = "cd7ec400de891a22f29d79b46bdcc71ddb0f42f66db835538b4c592b9f6dfa6ad5182f5aeaba93a79793473cd2b15fffea37f0b3ec51c57984d7d86e4430a832";
  // peer_data.set_peer_data(prikey, pubkey, 'http://192.168.1.5:8081/api/verify-download');
  // session.add_extension(peer_data);

  console.log('--------------Add Torrent Into the session and Seed------------------------');
  // var torrent_handle = session.add_torrent(params);

  session.async_add_torrent({
    ti: torrent_info,
    save_path: pieceHashPath,
    seed_mode: true,
  }, function(torrent_handle) {
  
    var alert = session.pop_alert();
    console.log(torrent_handle.is_valid());
    var info_hash = torrent_handle.info_hash();
    console.log('info_hash::::::', info_hash);
    console.log('torrent_handle::::', torrent_handle.status().name);

    var time = setInterval(function() {
      var progress = torrent_handle.status().progress;
      var state = torrent_handle.status().state;
      console.log('alert:::::::', alert.category());
      console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
      if (progress === 1 && state === 5) {
        clearInterval(time);
      }
    },1);
  });
});

console.log('Seeding ................................');
setTimeout(function() {
  session.stop_session();
  console.log('Done!');
}, 300000);