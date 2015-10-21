var path = require('path');
var FileStorage = require('../src/js/file_storage');
var CreateTorrent = require('../src/js/create_torrent');
var TorrentInfo = require('../src/js/torrent_info');

var file_storage = new FileStorage();
var infile = '/home/vagrant/libtorrent/test/data/';

// add files into file_storage
file_storage.add_file(infile);

console.log('File Name:', file_storage.file_name_ptr(0));
console.log('File Name:', file_storage.file_name_ptr(1));

// create torrent
console.log('Create create_torrent');
var create_torrent = new CreateTorrent(file_storage.get_instance());
create_torrent.set_comment('Comment');
create_torrent.set_creator('Creator');

// Generate Torrent file
console.log('Create torrent_file');
var torrent_file = create_torrent.generate();

// console.log('Create torrent_info');
var torrent_info = new TorrentInfo(torrent_file);

// console.log('Create magnet_link');
var magnet_link = torrent_info.create_magnet_uri()
console.log('magnet link = ', magnet_link);
