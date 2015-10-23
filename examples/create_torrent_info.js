var path = require('path');
var FileStorage = require('../src/js/file_storage');
var CreateTorrent = require('../src/js/create_torrent');
var TorrentInfo = require('../src/js/torrent_info');

var file_storage = new FileStorage();
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
var create_torrent = new CreateTorrent(file_storage.get_entry());
create_torrent.set_comment('Comment');
create_torrent.set_creator('Creator');

// Generate Torrent file
console.log('Create torrent_file');
var torrent_file = create_torrent.generate();
var torrent_info1 = new TorrentInfo(torrent_file);

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
var create_torrent2 = new CreateTorrent(file_storage.get_entry());
create_torrent2.set_comment('Comment');
create_torrent2.set_creator('Creator');

// Generate Torrent file
console.log('Get bencode from create_torrent2');
var bencode = create_torrent2.bencode(outpath);
var torrent_info2 = new TorrentInfo(bencode, bencode.length, 0);

// console.log('Create magnet_link');
var magnet_link = torrent_info2.create_magnet_uri()
console.log('magnet link = ', magnet_link);

console.log('--------------------------------------');

infile = '/home/vagrant/libtorrent/examples/data/sample.torrent';
console.log('Create torrent_info from filename');
var torrent_info3 = new TorrentInfo(infile, 0);

// console.log('Create magnet_link');
var magnet_link = torrent_info3.create_magnet_uri()
console.log('magnet link = ', magnet_link);
