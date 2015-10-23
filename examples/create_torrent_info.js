var path = require('path');
var libtorrent = require('../src/js/libtorrent');

var file_storage = new libtorrent.file_storage();
var infile = '/home/vagrant/libtorrent/examples/data';
var outpath = path.resolve(__dirname);

// add files into file_storage
console.log('--------------------------------------');
console.log('Create torrent_info from torrent_entry');
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
var torrent_info1 = new libtorrent.torrent_info(torrent_file);

console.log('Create magnet_link');
var magnet_link = torrent_info1.create_magnet_uri()
console.log('magnet link = ', magnet_link);

// add files into file_storage
console.log('--------------------------------------');
console.log('Create torrent_info from Torrent bencode');
file_storage.add_file(infile);

console.log('File Name:', file_storage.file_name_ptr(0));
console.log('Number of files:', file_storage.num_files());

// create torrent
console.log('Create create_torrent');
var create_torrent2 = new libtorrent.create_torrent(file_storage);
create_torrent2.set_comment('Comment');
create_torrent2.set_creator('Creator');

// Generate Torrent file
console.log('Get bencode from create_torrent2');
create_torrent2.set_piece_hashes(outpath);
var bencode = create_torrent2.bencode();
var torrent_info2 = new libtorrent.torrent_info(bencode, bencode.length, 0);

// console.log('Create magnet_link');
var magnet_link = torrent_info2.create_magnet_uri()
console.log('magnet link = ', magnet_link);

console.log('--------------------------------------');

infile = '/home/vagrant/libtorrent/examples/data/sample.torrent';
console.log('Create torrent_info from filename');
var torrent_info3 = new libtorrent.torrent_info(infile, 0);

// console.log('Create magnet_link');
var magnet_link = torrent_info3.create_magnet_uri()
console.log('magnet link = ', magnet_link);
