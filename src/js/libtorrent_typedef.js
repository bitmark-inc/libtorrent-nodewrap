var ref = require('ref');
var Struct = require('ref-struct');

var SessionStatus = Struct({
  'has_incoming_connections': 'bool',
  'upload_rate': 'int',
  'download_rate': 'int',
  'total_download': 'int64',
  'total_upload': 'int64',
  'payload_upload_rate': 'int',
  'payload_download_rate': 'int',
  'total_payload_download': 'int64',
  'total_payload_upload': 'int64',
  'ip_overhead_upload_rate': 'int',
  'ip_overhead_download_rate': 'int',
  'total_ip_overhead_download': 'int64',
  'total_ip_overhead_upload': 'int64',
  'dht_upload_rate': 'int',
  'dht_download_rate': 'int',
  // 'total_dht_download': 'int64',
  'total_dht_upload': 'int64',
  'tracker_upload_rate': 'int',
  'tracker_download_rate': 'int',
  // 'total_tracker_download': 'int64',
  // 'total_tracker_upload': 'int64',
  // 'total_redundant_bytes': 'int64',
  // 'total_failed_bytes': 'int64',
  // 'num_peers': 'int',
  // 'num_unchoked': 'int',
  // 'allowed_upload_slots': 'int',
  // 'up_bandwidth_queue': 'int',
  // 'down_bandwidth_queue': 'int',
  // 'up_bandwidth_bytes_queue': 'int',
  // 'down_bandwidth_bytes_queue': 'int',
  // 'optimistic_unchoke_counter': 'int',
  // 'unchoke_counter': 'int',
  // 'disk_write_queue': 'int',
  // 'disk_read_queue': 'int',
  // 'dht_nodes': 'int',
  // 'dht_node_cache': 'int',
  // 'dht_torrents': 'int',
  // 'dht_global_nodes': 'int64',
  // 'dht_total_allocations': 'int',
  // 'peerlist_size': 'int',
  // 'active_requests': 'Object', //std::vector<dht_lookup>
  // 'dht_routing_table': 'Object', //std::vector<dht_routing_bucket>
  // 'utp_stats': 'Object', //utp_status
});

var SessionStatusPtr = ref.refType(SessionStatus);


module.exports = function() {
  var typedef = {
    // typedef
    'ref': ref,
    'SessionStatus': SessionStatus,
    'SessionStatusPtr': SessionStatusPtr
  }
  return typedef
}()