var ffi = require('ffi');
var path = require('path');
var UtpStatus = require('./utp_status')();

// get root dir
var root_dir;
if (ffi.LIB_EXT === '.dll') {
  root_dir = path.resolve(__dirname.replace('\\src\\js', '\\'));
} else {
  root_dir = __dirname.replace('/src/js', '/');
}

module.exports = function() {

  var s_status = ffi.Library(path.resolve(root_dir, 'src/cpp/session_status'), {
    'get_session_status': [ 'pointer', ['pointer'] ],
    'get_upload_rate': [ 'int', ['pointer'] ],
    'get_download_rate': [ 'int', ['pointer'] ],
    'get_total_download': [ 'int64', ['pointer'] ],
    'get_total_upload': [ 'int64', ['pointer'] ],
    'get_payload_upload_rate': [ 'int', ['pointer'] ],
    'get_payload_download_rate': [ 'int', ['pointer'] ],
    'get_total_payload_download': [ 'int64', ['pointer'] ],
    'get_total_payload_upload': [ 'int64', ['pointer'] ],
    'get_ip_overhead_upload_rate': [ 'int', ['pointer'] ],
    'get_ip_overhead_download_rate': [ 'int', ['pointer'] ],
    'get_total_ip_overhead_download': [ 'int64', ['pointer'] ],
    'get_total_ip_overhead_upload': [ 'int64', ['pointer'] ],
    'get_dht_upload_rate': [ 'int', ['pointer'] ],
    'get_dht_download_rate': [ 'int', ['pointer'] ],
    'get_total_dht_download': [ 'int64', ['pointer'] ],
    'get_total_dht_upload': [ 'int64', ['pointer'] ],
    'get_tracker_upload_rate': [ 'int', ['pointer'] ],
    'get_tracker_download_rate': [ 'int', ['pointer'] ],
    'get_total_tracker_download': [ 'int64', ['pointer'] ],
    'get_total_tracker_upload': [ 'int64', ['pointer'] ],
    'get_total_redundant_bytes': [ 'int64', ['pointer'] ],
    'get_total_failed_bytes': [ 'int64', ['pointer'] ],
    'get_num_peers': [ 'int', ['pointer'] ],
    'get_num_unchoked': [ 'int', ['pointer'] ],
    'get_allowed_upload_slots': [ 'int', ['pointer'] ],
    'get_up_bandwidth_queue': [ 'int', ['pointer'] ],
    'get_down_bandwidth_queue': [ 'int', ['pointer'] ],
    'get_up_bandwidth_bytes_queue': [ 'int', ['pointer'] ],
    'get_down_bandwidth_bytes_queue': [ 'int', ['pointer'] ],
    'get_optimistic_unchoke_counter': [ 'int', ['pointer'] ],
    'get_unchoke_counter': [ 'int', ['pointer'] ],
    'get_disk_write_queue': [ 'int', ['pointer'] ],
    'get_disk_read_queue': [ 'int', ['pointer'] ],
    'get_dht_nodes': [ 'int', ['pointer'] ],
    'get_dht_node_cache': [ 'int', ['pointer'] ],
    'get_dht_torrents': [ 'int', ['pointer'] ],
    'get_dht_global_nodes': [ 'int64', ['pointer'] ],
    // 'get_active_requests': [ 'std::vector<dht_lookup>', ['pointer'] ],
    // 'get_dht_routing_table': [ 'std::vector<dht_routing_bucket>', ['pointer'] ],
    'get_dht_total_allocations': [ 'int', ['pointer'] ],
    'get_peerlist_size': [ 'int', ['pointer'] ],
  });

  var SessionStatus = function(session_ptr) {

  	// initial session point
    var _s = session_ptr;

    // get session status pointer
    var _s_status = s_status.get_session_status(_s);

    // set properties
    this.upload_rate = s_status.get_upload_rate(_s_status);
    this.download_rate = s_status.get_download_rate(_s_status);
    this.total_download = s_status.get_total_download(_s_status);
    this.total_upload = s_status.get_total_upload(_s_status);
    this.payload_upload_rate = s_status.get_payload_upload_rate(_s_status);
    this.payload_download_rate = s_status.get_payload_download_rate(_s_status);
    this.total_payload_download = s_status.get_total_payload_download(_s_status);
    this.total_payload_upload = s_status.get_total_payload_upload(_s_status);
    this.ip_overhead_upload_rate = s_status.get_ip_overhead_upload_rate(_s_status);
    this.ip_overhead_download_rate = s_status.get_ip_overhead_download_rate(_s_status);
    this.total_ip_overhead_download = s_status.get_total_ip_overhead_download(_s_status);
    this.total_ip_overhead_upload = s_status.get_total_ip_overhead_upload(_s_status);
    this.dht_upload_rate = s_status.get_dht_upload_rate(_s_status);
    this.dht_download_rate = s_status.get_dht_download_rate(_s_status);
    this.total_dht_download = s_status.get_total_dht_download(_s_status);
    this.total_dht_upload = s_status.get_total_dht_upload(_s_status);
    this.tracker_upload_rate = s_status.get_tracker_upload_rate(_s_status);
    this.tracker_download_rate = s_status.get_tracker_download_rate(_s_status);
    this.total_tracker_download = s_status.get_total_tracker_download(_s_status);
    this.total_tracker_upload = s_status.get_total_tracker_upload(_s_status);
    this.total_redundant_bytes = s_status.get_total_redundant_bytes(_s_status);
    this.total_failed_bytes = s_status.get_total_failed_bytes(_s_status);
    this.num_peers = s_status.get_num_peers(_s_status);
    this.num_unchoked = s_status.get_num_unchoked(_s_status);
    this.allowed_upload_slots = s_status.get_allowed_upload_slots(_s_status);
    this.up_bandwidth_queue = s_status.get_up_bandwidth_queue(_s_status);
    this.down_bandwidth_queue = s_status.get_down_bandwidth_queue(_s_status);
    this.up_bandwidth_bytes_queue = s_status.get_up_bandwidth_bytes_queue(_s_status);
    this.down_bandwidth_bytes_queue = s_status.get_down_bandwidth_bytes_queue(_s_status);
    this.optimistic_unchoke_counter = s_status.get_optimistic_unchoke_counter(_s_status);
    this.unchoke_counter = s_status.get_unchoke_counter(_s_status);
    this.disk_write_queue = s_status.get_disk_write_queue(_s_status);
    this.disk_read_queue = s_status.get_disk_read_queue(_s_status);
    this.dht_nodes = s_status.get_dht_nodes(_s_status);
    this.dht_node_cache = s_status.get_dht_node_cache(_s_status);
    this.dht_torrents = s_status.get_dht_torrents(_s_status);
    this.dht_global_nodes = s_status.get_dht_global_nodes(_s_status);
    this.dht_total_allocations = s_status.get_dht_total_allocations(_s_status);
    this.peerlist_size = s_status.get_peerlist_size(_s_status);

    // set value for utp_status object
    this.utp_status = new UtpStatus(_s_status);

  };

  return SessionStatus;
};