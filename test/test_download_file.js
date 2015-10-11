var libtorrent = require('../wrapper/libtorrent');
var path = require('path');

var session = new libtorrent.Session();

var savepath = path.resolve(__dirname);
var magnet_uri = 'magnet:?xt=urn:btih:61e7f76315bb2fbd93962a830b7725ea639763ea&dn=precise64.box';
var th_ptr = session.add_torrent_by_maget_uri(savepath, magnet_uri);

var time = setInterval(function() {
  var progress = session.get_downloading_progress(th_ptr);
  console.log((Number(progress * 100)).toFixed(2) + '%');
  if (progress == 1)
    clearInterval(time);
},100);