var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.session();

//for VM ubuntu
//var pieceHashPath = '/home/vagrant/libtorrent/';
// for window
var pieceHashPath = 'D:/node_modules/libtorrent-nodewrap/examples/save/';
// var pieceHashPath = '/Users/thinhuockim/Documents/project/bitmark/libtorrent-nodewrap/examples';
// var magnet_uri = 'magnet:?xt=urn:btih:61e7f76315bb2fbd93962a830b7725ea639763ea&dn=precise64.box';
// var magnet_uri = 'magnet:?xt=urn:btih:82d05efa9a34bcb143215c307a6f066179551000&dn=test_data.txt';
// var magnet_uri = 'magnet:?xt=urn:btih:12f1d333efa7c8c5df465852aa40787b2d16d5ba'; // download 2 file

// bach
var magnet_uri = 'magnet:?xt=urn:btih:85965e7fa3c97adc7c8de4b8b162e95fc250b30b'; // download 2 file


console.log('--------------Add Torrent Param------------------------');
var params = new libtorrent.add_torrent_params();
params.url = magnet_uri;
params.save_path = pieceHashPath;
params.seed_mode = false;

console.log('--------------Add Torrent Torrent extension into the session------------------------');
var peer_data = new libtorrent.peer_data();
var pubkey = "d5182f5aeaba93a79793473cd2b15fffea37f0b3ec51c57984d7d86e4430a832";
var prikey = "cd7ec400de891a22f29d79b46bdcc71ddb0f42f66db835538b4c592b9f6dfa6ad5182f5aeaba93a79793473cd2b15fffea37f0b3ec51c57984d7d86e4430a832";
peer_data.set_peer_data(prikey, pubkey, 'http://192.168.1.5:8081/api/verify-download');
peer_data.add_peer_pubkey('127.0.0.1:6882', "d5182f5aeaba93a79793473cd2b15fffea37f0b3ec51c57984d7d86e4430a832");
peer_data.add_bitmark_id("demoSeeding", '85965e7fa3c97adc7c8de4b8b162e95fc250b30b');
//session.add_extension(peer_data);

console.log('--------------Add Torrent Into the session and Seed------------------------');
var torrent_handle = session.add_torrent(params);
torrent_handle.connect_peer('127.0.0.1', 6882, 0);
// torrent_handle.add_url_seed(seed_url);
console.log(torrent_handle.is_valid());

// add info_hash to peer_data
console.log('--------------Add info_hash of torrent object Into the peer_data------------------------');

var time = setInterval(function() {
  var progress = torrent_handle.status().progress;
  var state = torrent_handle.status().state;
  console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
  if (progress === 1 && state === 5)
    clearInterval(time);
  if (state === 4) {
    console.log('Finished');
    clearInterval(time);
  }
},100);