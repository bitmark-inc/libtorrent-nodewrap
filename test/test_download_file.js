var libtorrent = require('../src/js/libtorrent');
var path = require('path');

var session = new libtorrent.Session();

var savepath = './';
// var magnet_uri = 'magnet:?xt=urn:btih:61e7f76315bb2fbd93962a830b7725ea639763ea&dn=precise64.box';
// var magnet_uri = 'magnet:?xt=urn:btih:82d05efa9a34bcb143215c307a6f066179551000&dn=test_data.txt';
var magnet_uri = 'magnet:?xt=urn:sha1:81283e3c040b35cd6edc60601c7eaa36b884cf82'; // download 2 file
var th_ptr = session.add_torrent_by_maget_uri(savepath, magnet_uri);
session.add_url_seed(th_ptr, '127.0.0.1:6882');

// get file name
var name = session.get_name(th_ptr);

console.log('torrent name: ' + name);

var time = setInterval(function() {
  var progress = session.get_downloading_progress(th_ptr);
  var state = session.get_torrent_state(th_ptr);
  console.log((Number(progress * 100)).toFixed(2) + '% ---- ' + state);
  if (progress == 1 && state ==5)
    clearInterval(time);
},100);