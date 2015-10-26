var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.session();
session.listen_on(6882, 6882);

console.log('Torrent client are literning at port: ' + session.listen_port());

var file_storage = new libtorrent.file_storage();
var dataPath = '/home/vagrant/libtorrent/examples/data';
var pieceHashPath = '/home/vagrant/libtorrent/examples';

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

// Generate Torrent file
console.log('Create torrent_file');
var torrent_file = create_torrent.generate();
var torrent_info = new libtorrent.torrent_info(torrent_file);

console.log('Create magnet_link');
var magnet_link = torrent_info.create_magnet_uri()
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
// var torrent_handle = session.add_torrent(params);
var torrent_handle = session.add_torrent({
  ti: torrent_info,
  save_path: pieceHashPath,
  seed_mode: true,
});
console.log(torrent_handle.is_valid());
var buff = new Buffer(torrent_handle.info_hash(), 'base64');
console.log(buff.toString());


console.log('--------------Add Torrent Torrent extension into the session------------------------');
// var torrent_handle = session.add_torrent(params);
var torrent_handle = session.add_extension();

console.log('Seeding ..... ');

setTimeout(function() {
  session.stop_session();
  console.log('Done!');
}, 10000);