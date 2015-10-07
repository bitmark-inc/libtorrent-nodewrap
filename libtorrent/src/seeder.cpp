
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
  file_storage fs;
  add_files(fs, "/home/vagrant/libtorrent/node-libtorrent-wrap/test/test_data.txt");

  create_torrent t(fs);
  t.set_creator("Test Creator");
  t.set_comment("Test Comment");
  set_piece_hashes(t, "/home/vagrant/libtorrent/node-libtorrent-wrap/test/");


  std::vector<char> torrentBuffer;
  bencode(back_inserter(torrentBuffer), t.generate());

  error_code ec;
  torrent_info info = torrent_info(&torrentBuffer[0], torrentBuffer.size(), ec);
  if (ec) {
    std::cout << ec.message();
    return 1;
  }
  std::string magnetUrl = make_magnet_uri(info);
  std::cout << magnetUrl << "\n";
  // magnet:?xt=urn:btih:9fbfd170df2312b0923f3bc387d69bb044d277fb

  session ses;
  ses.listen_on(std::make_pair(6881, 6881), ec);
  if (ec) {
    fprintf(stderr, "failed to open listen socket: %s\n", ec.message().c_str());
    return 1;
  }

  add_torrent_params p;
  p.save_path = "/home/vagrant/libtorrent/node-libtorrent-wrap/test/";
  p.ti = &info;
  p.seed_mode = true;
  torrent_handle th = ses.add_torrent(p, ec);
  if (ec) {
    std::cout << ec.message();
    return 1;
  }
  ses.start_dht();
  ses.start_upnp();
  ses.start_natpmp();
  ses.add_port_mapping(session::udp, 6881, 6881);

  torrent_status ts = th.status();
  while (ts.is_seeding) {
    std::cout << "Seeding\n";
    std::cout.flush();
    sleep(1000);
  }
}