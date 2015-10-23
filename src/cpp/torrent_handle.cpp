// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {
  bool is_valid(torrent_handle* handle) {
    return handle->is_valid();
  }
  char* info_hash(torrent_handle* handle) {
    std::cout << handle->info_hash() << std::endl;
    return strdup(handle->info_hash().to_string().c_str());
  }
  torrent_status* status(torrent_handle* handle) {
    return new torrent_status(handle->status());
  }
  void add_url_seed(torrent_handle* handle, char *data) {
    std::string const& url = data;
    handle->add_url_seed(url);
  }
}