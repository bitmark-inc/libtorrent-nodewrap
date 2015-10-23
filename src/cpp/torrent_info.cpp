// include C
#include <unistd.h>
#include <libtorrent/torrent_info.hpp>
#include "libtorrent/magnet_uri.hpp"

using namespace libtorrent;
using namespace std;

extern "C" {

  boost::intrusive_ptr<torrent_info>* new_torrent_info_entry(entry* torrent_file) {
    boost::intrusive_ptr<torrent_info> *ti_ptr = new boost::intrusive_ptr<torrent_info>();
    *ti_ptr = new torrent_info(*torrent_file);
    return ti_ptr;
  }

  boost::intrusive_ptr<torrent_info>* new_torrent_info_filename(char const* filename, int flags = 0) {
    std:string filename_str = filename;
    libtorrent::error_code ec;
    boost::intrusive_ptr<torrent_info> *ti_ptr = new boost::intrusive_ptr<torrent_info>();
    *ti_ptr = new torrent_info(filename_str, ec, flags);
    if (ec) {
      std::cout << ec.message() << std::endl;
    }
    return ti_ptr;
  }

  boost::intrusive_ptr<torrent_info>* new_torrent_info_torrent_buffer(std::vector<char>* torrentbuffer, int length, int flags = 0) {
    std::vector<char> v = *torrentbuffer;
    libtorrent::error_code ec;
    boost::intrusive_ptr<torrent_info> *ti_ptr = new boost::intrusive_ptr<torrent_info>();
    *ti_ptr = new torrent_info(&v[0], v.size(), ec, flags);
    if (ec) {
      std::cout << ec.message() << std::endl;
    }
    return ti_ptr;
  }

  boost::intrusive_ptr<torrent_info>* new_torrent_info_hash(char const* info_hash, int flags = 0) {
    sha1_hash ih(info_hash);
    return (boost::intrusive_ptr<torrent_info>*)new torrent_info(ih, flags);
  }

  char* create_magnet_uri(boost::intrusive_ptr<torrent_info>* ti) {
    std::string magnetUrl = make_magnet_uri(*ti->get());
    return strdup(magnetUrl.c_str());
  }
}