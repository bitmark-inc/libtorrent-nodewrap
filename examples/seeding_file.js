var session = require('../src/js/session');
var FileStorage = require('../src/js/file_storage');
var CreateTorrent = require('../src/js/create_torrent');
var TorrentInfo = require('../src/js/torrent_info');
var AddTorrentParam = require('../src/js/add_torrent_params');
var path = require('path');

var session = new session.Session();
session.listen_on(6882, 6882, function(port) {
  console.log('Torrent client are literning at port: ' + port);

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
  var torrent_info = new TorrentInfo(torrent_file);

  console.log('Create magnet_link');
  var magnet_link = torrent_info.create_magnet_uri()
  console.log('magnet link = ', magnet_link);

  console.log('--------------Add Torrent Param------------------------');
  var params = new AddTorrentParam();
  params.set_ti(torrent_info.get_entry());
  params.set_save_path('./');
  params.set_seed_mode(true);

  console.log('--------------Add Torrent Into the session and Seed------------------------');
  var torrent_handle = session.add_torrent(params.get_entry());
  console.log(torrent_handle.is_valid());
  var buff = new Buffer(torrent_handle.info_hash(), 'base64');
  console.log(buff.toString());


  console.log('Seeding ..... ');
});
setTimeout(function() {
  session.stop_session();
  console.log('Done!');
}, 10000);