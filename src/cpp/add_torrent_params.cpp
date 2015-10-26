// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {
  add_torrent_params* new_add_torrent_params() {
    return new add_torrent_params();
  }

  void set_ti(add_torrent_params *p, boost::intrusive_ptr<torrent_info> *ti) {
    p->ti = *ti;
  }
  void set_info_hash(add_torrent_params *p, const char* info_hash) {
    sha1_hash ih(info_hash);
    p->info_hash = ih;
  }
  void set_version(add_torrent_params *p, int data) {
    p->version = data;
  }
  void set_name(add_torrent_params *p, char* data) {
    std::string str = data;
    p->name = str;
  }
  void set_save_path(add_torrent_params *p, char* data) {
    std::string str = data;
    p->save_path = str;
  }
  void set_trackerid(add_torrent_params *p, char* data) {
    std::string str = data;
    p->trackerid = str;
  }
  void set_url(add_torrent_params *p, char* data) {
    std::string str = data;
    p->url = str;
  }
  void set_uuid(add_torrent_params *p, char* data) {
    std::string str = data;
    p->uuid = str;
  }
  void set_source_feed_url(add_torrent_params *p, char* data) {
    std::string str = data;
    p->source_feed_url = data;
  }
  void set_max_uploads(add_torrent_params *p, int data) {
    p->max_uploads = data;
  }
  void set_max_connections(add_torrent_params *p, int data) {
    p->max_connections = data;
  }
  void set_upload_limit(add_torrent_params *p, int data) {
    p->upload_limit = data;
  }
  void set_download_limit(add_torrent_params *p, int data) {
    p->download_limit = data;
  }
  void set_seed_mode(add_torrent_params *p, bool data) {
    p->seed_mode = data;
  }
  void set_flags(add_torrent_params *p, boost::uint64_t data) {
    p->flags = data;
  }
}