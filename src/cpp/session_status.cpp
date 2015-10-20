// include C
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {
  session_status* get_session_status(session *s) {
  	return new session_status(s->status());
  }
  int get_upload_rate(session_status *status) {
    return status->upload_rate;
  }
  int get_download_rate(session_status *status) {
    return status->download_rate;
  }
  size_type get_total_download(session_status *status) {
    return status->total_download;
  }
  size_type get_total_upload(session_status *status) {
    return status->total_upload;
  }
  int get_payload_upload_rate(session_status *status) {
    return status->payload_upload_rate;
  }
  int get_payload_download_rate(session_status *status) {
    return status->payload_download_rate;
  }
  size_type get_total_payload_download(session_status *status) {
    return status->total_payload_download;
  }
  size_type get_total_payload_upload(session_status *status) {
    return status->total_payload_upload;
  }
  int get_ip_overhead_upload_rate(session_status *status) {
    return status->ip_overhead_upload_rate;
  }
  int get_ip_overhead_download_rate(session_status *status) {
    return status->ip_overhead_download_rate;
  }
  size_type get_total_ip_overhead_download(session_status *status) {
    return status->total_ip_overhead_download;
  }
  size_type get_total_ip_overhead_upload(session_status *status) {
    return status->total_ip_overhead_upload;
  }
  int get_dht_upload_rate(session_status *status) {
    return status->dht_upload_rate;
  }
  int get_dht_download_rate(session_status *status) {
    return status->dht_download_rate;
  }
  size_type get_total_dht_download(session_status *status) {
    return status->total_dht_download;
  }
  size_type get_total_dht_upload(session_status *status) {
    return status->total_dht_upload;
  }
  int get_tracker_upload_rate(session_status *status) {
    return status->tracker_upload_rate;
  }
  int get_tracker_download_rate(session_status *status) {
    return status->tracker_download_rate;
  }
  size_type get_total_tracker_download(session_status *status) {
    return status->total_tracker_download;
  }
  size_type get_total_tracker_upload(session_status *status) {
    return status->total_tracker_upload;
  }
  size_type get_total_redundant_bytes(session_status *status) {
    return status->total_redundant_bytes;
  }
  size_type get_total_failed_bytes(session_status *status) {
    return status->total_failed_bytes;
  }
  int get_num_peers(session_status *status) {
    return status->num_peers;
  }
  int get_num_unchoked(session_status *status) {
    return status->num_unchoked;
  }
  int get_allowed_upload_slots(session_status *status) {
    return status->allowed_upload_slots;
  }
  int get_up_bandwidth_queue(session_status *status) {
    return status->up_bandwidth_queue;
  }
  int get_down_bandwidth_queue(session_status *status) {
    return status->down_bandwidth_queue;
  }
  int get_up_bandwidth_bytes_queue(session_status *status) {
    return status->up_bandwidth_bytes_queue;
  }
  int get_down_bandwidth_bytes_queue(session_status *status) {
    return status->down_bandwidth_bytes_queue;
  }
  int get_optimistic_unchoke_counter(session_status *status) {
    return status->optimistic_unchoke_counter;
  }
  int get_unchoke_counter(session_status *status) {
    return status->unchoke_counter;
  }
  int get_disk_write_queue(session_status *status) {
    return status->disk_write_queue;
  }
  int get_disk_read_queue(session_status *status) {
    return status->disk_read_queue;
  }
  int get_dht_nodes(session_status *status) {
    return status->dht_nodes;
  }
  int get_dht_node_cache(session_status *status) {
    return status->dht_node_cache;
  }
  int get_dht_torrents(session_status *status) {
    return status->dht_torrents;
  }
  size_type get_dht_global_nodes(session_status *status) {
    return status->dht_global_nodes;
  }
  std::vector<dht_lookup> get_active_requests(session_status *status) {
    return status->active_requests;
  }
  std::vector<dht_routing_bucket> get_dht_routing_table(session_status *status) {
    return status->dht_routing_table;
  }
  int get_dht_total_allocations(session_status *status) {
    return status->dht_total_allocations;
  }
  utp_status get_utp_stats(session_status *status) {
    return status->utp_stats;
  }
  int get_peerlist_size(session_status *status) {
    return status->peerlist_size;
  }
}