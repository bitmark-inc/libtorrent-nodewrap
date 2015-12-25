// include C

#include "libtorrent/session.hpp"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#include <unistd.h>
#endif

using namespace libtorrent;
using namespace std;

extern "C" {
  EXPORT session_status* get_session_status(session *s) {
  	return new session_status(s->status());
  }
  EXPORT int get_upload_rate(session_status *status) {
    return status->upload_rate;
  }
  EXPORT int get_download_rate(session_status *status) {
    return status->download_rate;
  }
  EXPORT size_type get_total_download(session_status *status) {
    return status->total_download;
  }
  EXPORT size_type get_total_upload(session_status *status) {
    return status->total_upload;
  }
  EXPORT int get_payload_upload_rate(session_status *status) {
    return status->payload_upload_rate;
  }
  EXPORT int get_payload_download_rate(session_status *status) {
    return status->payload_download_rate;
  }
  EXPORT size_type get_total_payload_download(session_status *status) {
    return status->total_payload_download;
  }
  EXPORT size_type get_total_payload_upload(session_status *status) {
    return status->total_payload_upload;
  }
  EXPORT int get_ip_overhead_upload_rate(session_status *status) {
    return status->ip_overhead_upload_rate;
  }
  EXPORT int get_ip_overhead_download_rate(session_status *status) {
    return status->ip_overhead_download_rate;
  }
  EXPORT size_type get_total_ip_overhead_download(session_status *status) {
    return status->total_ip_overhead_download;
  }
  EXPORT size_type get_total_ip_overhead_upload(session_status *status) {
    return status->total_ip_overhead_upload;
  }
  EXPORT int get_dht_upload_rate(session_status *status) {
    return status->dht_upload_rate;
  }
  EXPORT int get_dht_download_rate(session_status *status) {
    return status->dht_download_rate;
  }
  EXPORT size_type get_total_dht_download(session_status *status) {
    return status->total_dht_download;
  }
  EXPORT size_type get_total_dht_upload(session_status *status) {
    return status->total_dht_upload;
  }
  EXPORT int get_tracker_upload_rate(session_status *status) {
    return status->tracker_upload_rate;
  }
  EXPORT int get_tracker_download_rate(session_status *status) {
    return status->tracker_download_rate;
  }
  EXPORT size_type get_total_tracker_download(session_status *status) {
    return status->total_tracker_download;
  }
  EXPORT size_type get_total_tracker_upload(session_status *status) {
    return status->total_tracker_upload;
  }
  EXPORT size_type get_total_redundant_bytes(session_status *status) {
    return status->total_redundant_bytes;
  }
  EXPORT size_type get_total_failed_bytes(session_status *status) {
    return status->total_failed_bytes;
  }
  EXPORT int get_num_peers(session_status *status) {
    return status->num_peers;
  }
  EXPORT int get_num_unchoked(session_status *status) {
    return status->num_unchoked;
  }
  EXPORT int get_allowed_upload_slots(session_status *status) {
    return status->allowed_upload_slots;
  }
  EXPORT int get_up_bandwidth_queue(session_status *status) {
    return status->up_bandwidth_queue;
  }
  EXPORT int get_down_bandwidth_queue(session_status *status) {
    return status->down_bandwidth_queue;
  }
  EXPORT int get_up_bandwidth_bytes_queue(session_status *status) {
    return status->up_bandwidth_bytes_queue;
  }
  EXPORT int get_down_bandwidth_bytes_queue(session_status *status) {
    return status->down_bandwidth_bytes_queue;
  }
  EXPORT int get_optimistic_unchoke_counter(session_status *status) {
    return status->optimistic_unchoke_counter;
  }
  EXPORT int get_unchoke_counter(session_status *status) {
    return status->unchoke_counter;
  }
  EXPORT int get_disk_write_queue(session_status *status) {
    return status->disk_write_queue;
  }
  EXPORT int get_disk_read_queue(session_status *status) {
    return status->disk_read_queue;
  }
  EXPORT int get_dht_nodes(session_status *status) {
    return status->dht_nodes;
  }
  EXPORT int get_dht_node_cache(session_status *status) {
    return status->dht_node_cache;
  }
  EXPORT int get_dht_torrents(session_status *status) {
    return status->dht_torrents;
  }
  EXPORT size_type get_dht_global_nodes(session_status *status) {
    return status->dht_global_nodes;
  }
  EXPORT std::vector<dht_lookup> get_active_requests(session_status *status) {
    return status->active_requests;
  }
  EXPORT std::vector<dht_routing_bucket> get_dht_routing_table(session_status *status) {
    return status->dht_routing_table;
  }
  EXPORT int get_dht_total_allocations(session_status *status) {
    return status->dht_total_allocations;
  }
  EXPORT utp_status get_utp_stats(session_status *status) {
    return status->utp_stats;
  }
  EXPORT int get_peerlist_size(session_status *status) {
    return status->peerlist_size;
  }
}