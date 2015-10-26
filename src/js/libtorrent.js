// var external_lib = require('./load_external_library');

module.exports = {
  session: require('./session'),
  torrent_info: require('./torrent_info'),
  add_torrent_params: require('./add_torrent_params'),
  file_storage: require('./file_storage'),
  torrent_handle: require('./torrent_handle'),
  torrent_status: require('./torrent_status'),
  create_torrent: require('./create_torrent'),
}