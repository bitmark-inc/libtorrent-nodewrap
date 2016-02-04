// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

using namespace libtorrent;

extern "C" {

  EXPORT std::string convert_2_hex_string(unsigned char *data, int len) {
    std::stringstream ss;
    ss << std::hex;
    for (int i = 0; i < len; ++i) {
      ss << std::setw(2) << std::setfill('0') << (int)data[i];
    }
    return ss.str();
  }
  EXPORT bool is_valid(torrent_handle* handle) {
    return handle->is_valid();
  }
  EXPORT char* info_hash(torrent_handle* handle) {
    std::cout << "Inside function::::" << handle->info_hash() << std::endl;
    unsigned char* info_hash = (unsigned char*)handle->info_hash().to_string().c_str();
    int lng = strlen((char *)info_hash);
    std::string tmp = convert_2_hex_string(info_hash, lng);
    return strdup(tmp.c_str());
  }
  EXPORT torrent_status* status(torrent_handle* handle) {
    return new torrent_status(handle->status());
  }
  EXPORT void add_url_seed(torrent_handle* handle, char *data) {
    std::string const& url = data;
    handle->add_url_seed(url);
  }
  EXPORT char* name(torrent_handle* handle) {
    return (char*)handle->name().c_str();
  }
  EXPORT void connect_peer(torrent_handle* handle, char *addr, int port, int source = 0) {
    tcp::endpoint ep(boost::asio::ip::address::from_string(addr), port);
    handle->connect_peer(ep, source);
  }
  EXPORT void set_upload_limit(torrent_handle *handle, int limit) {
    handle->set_upload_limit(limit);
  }
  EXPORT void set_download_limit(torrent_handle *handle, int limit) {
    handle->set_download_limit(limit);
  }
}