var path = require('path');
var libtorrent = require('../src/js/libtorrent');

var file_storage = new libtorrent.file_storage();
var infile = '/home/vagrant/libtorrent/examples/data/';

// add files into file_storage
file_storage.add_file(infile);

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

// console.log('Create torrent_info');
var torrent_info = new libtorrent.torrent_info(torrent_file);

// console.log('Create magnet_link');
var magnet_link = torrent_info.create_magnet_uri()
console.log('magnet link = ', magnet_link);
