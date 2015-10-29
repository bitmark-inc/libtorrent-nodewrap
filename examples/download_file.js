var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.session();

var pieceHashPath = '/home/vagrant/libtorrent/examples';
// var magnet_uri = 'magnet:?xt=urn:btih:61e7f76315bb2fbd93962a830b7725ea639763ea&dn=precise64.box';
// var magnet_uri = 'magnet:?xt=urn:btih:82d05efa9a34bcb143215c307a6f066179551000&dn=test_data.txt';
var magnet_uri = 'magnet:?xt=urn:btih:cc72be311856ee187f900e67c69e3c8504c07c7e'; // download 2 file


console.log('--------------Add Torrent Param------------------------');
var params = new libtorrent.add_torrent_params();
params.url = magnet_uri;
params.save_path = pieceHashPath;
params.seed_mode = true;

console.log('--------------Add Torrent Torrent extension into the session------------------------');
var peer_data = new libtorrent.peer_data();
var pk = (new Buffer('uMsWo4OPlmxzhYSx1IaUbqMgmeixRY4X7xEC4otgrTE=', 'base64')).toString('hex');
var sk = (new Buffer('oULYG9H3It3q4g5qmB/1na5ylxkysqzqHVlixl5RDGg=')).toString('hex');
var s_url = '127.0.0.1:3000/api/checkExtension';
var seed_url = '10.0.2.2:6882';
peer_data.set_peer_data(pk, sk, s_url);
session.add_extension(peer_data);

console.log('--------------Add Torrent Into the session and Seed------------------------');
var torrent_handle = session.add_torrent(params);
torrent_handle.add_url_seed(seed_url);
console.log(torrent_handle.is_valid());

// add info_hash to peer_data
console.log('--------------Add info_hash of torrent object Into the peer_data------------------------');
peer_data.set_torrent_peer(torrent_handle.info_hash(), seed_url);

var time = setInterval(function() {
  var progress = torrent_handle.status().progress;
  var state = torrent_handle.status().state;
  console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
  if (progress == 1 && state ==5)
    clearInterval(time);
},100);