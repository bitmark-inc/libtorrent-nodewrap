// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {

  std::string convert_2_hex_string(unsigned char *data, int len) {
    std::stringstream ss;
    ss << std::hex;
    for (int i = 0; i < len; ++i) {
      ss << std::setw(2) << std::setfill('0') << (int)data[i];
    }
    return ss.str();
  }
  bool is_valid(torrent_handle* handle) {
    return handle->is_valid();
  }
  char* info_hash(torrent_handle* handle) {
    std::cout << "Inside function::::" << handle->info_hash() << std::endl;
    unsigned char* info_hash = (unsigned char*)handle->info_hash().to_string().c_str();
    int lng = strlen((char *)info_hash);
    std::string tmp = convert_2_hex_string(info_hash, lng);
    return (char*)tmp.c_str();
  }
  torrent_status* status(torrent_handle* handle) {
    return new torrent_status(handle->status());
  }
  void add_url_seed(torrent_handle* handle, char *data) {
    std::string const& url = data;
    handle->add_url_seed(url);
  }
}