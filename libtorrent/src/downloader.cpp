#include "libtorrent/entry.hpp"
#include "libtorrent/bencode.hpp"
#include "libtorrent/torrent_info.hpp"
#include "libtorrent/file.hpp"
#include "libtorrent/storage.hpp"
#include "libtorrent/hasher.hpp"
#include "libtorrent/create_torrent.hpp"
#include "libtorrent/file.hpp"
#include "libtorrent/file_pool.hpp"
#include "libtorrent/magnet_uri.hpp"
#include "libtorrent/session.hpp"
#include "libtorrent/torrent_handle.hpp"

using namespace libtorrent;

int main(int argc, char* argv[]) {
  std::cout << "Adding torrent magnet...";
  std::cout.flush();
  session ses;
  add_torrent_params p;
  p.save_path = "./";
  p.url = "magnet:?xt=urn:btih:82d05efa9a34bcb143215c307a6f066179551000&dn=test_data.txt";
  torrent_handle th = ses.add_torrent(p);

  std::cout << "Downloading meta data...";
  std::cout.flush();
  torrent_status s = th.status();
  th.add_url_seed("127.0.0.1:6882");
  while (!th.status().has_metadata) {
    sleep(1000);
    s = th.status();
    std::set<std::string> urls = th.url_seeds();
    std::cout << s.state << ' ' << *urls.begin() << ' ' << s.has_metadata << ' ' << std::endl;
    std::cout.flush();
  }
  std::cout << "Got metadata, downloading file now...";
  while (th.status().state != torrent_status::seeding) {
    std::cout << "Progress " << (th.status().progress * 100);
    std::cout.flush();
    sleep(1000);
  }
}