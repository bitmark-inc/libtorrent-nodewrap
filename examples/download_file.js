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

console.log('--------------Add Torrent Into the session and Seed------------------------');
var torrent_handle = session.add_torrent(params);
torrent_handle.add_url_seed('10.0.2.2:6882');
console.log(torrent_handle.is_valid());

var time = setInterval(function() {
  var progress = torrent_handle.status().progress;
  var state = torrent_handle.status().state;
  console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
  if (progress == 1 && state ==5)
    clearInterval(time);
},100);