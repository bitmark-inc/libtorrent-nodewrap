var libtorrent = require('../wrapper/libtorrent');
var path = require('path');

var session = new libtorrent.Session();

var savepath = './';
// var magnet_uri = 'magnet:?xt=urn:btih:61e7f76315bb2fbd93962a830b7725ea639763ea&dn=precise64.box';
// var magnet_uri = 'magnet:?xt=urn:btih:82d05efa9a34bcb143215c307a6f066179551000&dn=test_data.txt';
var magnet_uri = 'magnet:?xt=urn:btih:3e06c8b4a4000f40e6d07a84f81cd30b11aa90e4&dn=data'; // download 2 file
var th_ptr = session.add_torrent_by_maget_uri(savepath, magnet_uri);

var time = setInterval(function() {
  var progress = session.get_downloading_progress(th_ptr);
  var state = session.get_torrent_state(th_ptr);
  console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
  if (progress == 1 && state ==5)
    clearInterval(time);
},100);