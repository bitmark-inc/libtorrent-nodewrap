// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;


#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

extern "C" {
  EXPORT add_torrent_params* new_add_torrent_params() {
    return new add_torrent_params();
  }

  EXPORT void set_ti(add_torrent_params *p, boost::intrusive_ptr<torrent_info> *ti) {
    p->ti = *ti;
  }
  EXPORT void set_info_hash(add_torrent_params *p, const char* info_hash) {
    sha1_hash ih(info_hash);
    p->info_hash = ih;
  }
  EXPORT void set_version(add_torrent_params *p, int data) {
    p->version = data;
  }
  EXPORT void set_name(add_torrent_params *p, char* data) {
    std::string str = data;
    p->name = str;
  }
  EXPORT void set_save_path(add_torrent_params *p, char* data) {
    std::string str = data;
    p->save_path = str;
  }
  EXPORT void set_trackerid(add_torrent_params *p, char* data) {
    std::string str = data;
    p->trackerid = str;
  }
  EXPORT void set_url(add_torrent_params *p, char* data) {
    std::string str = data;
    p->url = str;
  }
  EXPORT  void set_uuid(add_torrent_params *p, char* data) {
    std::string str = data;
    p->uuid = str;
  }
  EXPORT void set_source_feed_url(add_torrent_params *p, char* data) {
    std::string str = data;
    p->source_feed_url = data;
  }
  EXPORT void set_max_uploads(add_torrent_params *p, int data) {
    p->max_uploads = data;
  }
  EXPORT void set_max_connections(add_torrent_params *p, int data) {
    p->max_connections = data;
  }
  EXPORT void set_upload_limit(add_torrent_params *p, int data) {
    p->upload_limit = data;
  }
  EXPORT void set_download_limit(add_torrent_params *p, int data) {
    p->download_limit = data;
  }
  EXPORT void set_seed_mode(add_torrent_params *p, bool data) {
    p->seed_mode = data;
  }
  EXPORT void set_flags(add_torrent_params *p, boost::uint64_t data) {
    p->flags = data;
  }
}