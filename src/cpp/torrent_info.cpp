// include C
#include <unistd.h>
#include <libtorrent/torrent_info.hpp>
#include "libtorrent/magnet_uri.hpp"

using namespace libtorrent;
using namespace std;

extern "C" {

  boost::intrusive_ptr<torrent_info>* new_torrent_info(entry* torrent_file) {
    return (boost::intrusive_ptr<torrent_info>*)new torrent_info(*torrent_file);
  }

  char* create_magnet_uri(torrent_info* ti) {
  	std::string magnetUrl = make_magnet_uri(*ti);
    return strdup(magnetUrl.c_str());
  }
}