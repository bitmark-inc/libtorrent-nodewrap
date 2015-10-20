// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {
  add_torrent_params* new_add_torrent_params() {
    return new add_torrent_params();
  }

  void set_version(add_torrent_params *p, int data) {
    p->version = data;
  }
  void set_name(add_torrent_params *p, std::string data) {
    p->name = data;
  }
  void set_save_path(add_torrent_params *p, std::string data) {
    p->save_path = data;
  }
  void set_trackerid(add_torrent_params *p, std::string data) {
    p->trackerid = data;
  }
  void set_url(add_torrent_params *p, std::string data) {
    p->url = data;
  }
  void set_uuid(add_torrent_params *p, std::string data) {
    p->uuid = data;
  }
  void set_source_feed_url(add_torrent_params *p, std::string data) {
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

}