// include C
#include <stdint.h>
#include <stdio.h>
#include <cstdlib>
#include <pthread.h>

// include libtorrent
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
#include <libtorrent/torrent.hpp>
#include <libtorrent/ip_filter.hpp>

using namespace libtorrent;
using namespace std;

extern "C" {

  struct add_torrent_data{
    const char* inFile;
    const char* outPath;
    const char* seeder;
    const char* desc;
  };

  session ses;

  session* new_session() {
    printf("%s\n", "new session");
    return new session();
  }

  add_torrent_params get_torrent_param() {
    add_torrent_params p;
    return p;
  }

  int listen_on(int min_, int max_) {
    error_code ec;
    ses.listen_on(std::make_pair(min_, max_), ec);

    return 0;
  }

  /*
    Create torrent file and add seeding it
    @output - string: path of torrent file
    @inputFile - string: path of input file
    @outputFile - string: path of input file
  */
  void *add_torrent(void *threadarg) {

    // analizy data
    struct add_torrent_data *add_p;
    // add_p = (struct add_torrent_data *) threadarg;
    // const char* inFile = add_p->inFile;

    cout << "add_torrent " << endl;

    pthread_exit(NULL);

    // file_storage fs;
    // add_files(fs, inFile);

    // create_torrent t(fs);
    // t.set_creator(seeder);
    // t.set_comment(desc);
    // set_piece_hashes(t, outPath);


    // std::vector<char> torrentBuffer;
    // bencode(back_inserter(torrentBuffer), t.generate());

    // error_code ec;
    // torrent_info info = torrent_info(&torrentBuffer[0], torrentBuffer.size(), ec);
    // if (ec) {
    //   std::cout << ec.message();
    //   return 1;
    // }

    // std::string magnetUrl = make_magnet_uri(info);
    // std::cout << magnetUrl << "\n";
    // // magnet:?xt=urn:btih:9fbfd170df2312b0923f3bc387d69bb044d277fb

    // ses.listen_on(std::make_pair(6881, 6881), ec);
    // if (ec) {
    //   fprintf(stderr, "failed to open listen socket: %s\n", ec.message().c_str());
    //   return 1;
    // }

    // add_torrent_params p;
    // p.save_path = outPath;
    // p.ti = &info;
    // p.seed_mode = true;
    // // allow_threading_guard guard;
    // torrent_handle th = ses.add_torrent(p, ec);
    // if (ec) {
    //   std::cout << ec.message();
    //   return 1;
    // }
    // // s->start_dht();
    // // s->start_upnp();
    // // s->start_natpmp();
    // // s->add_port_mapping(session::udp, 6881, 6881);

    // torrent_status ts = th.status();
    // std::cout << torrent_status::seeding << std::endl;

    // while (th.status().state != torrent_status::seeding) {
    //   std::cout << "Progress " << (th.status().progress * 100);
    //   std::cout.flush();
    //   sleep(1000);
    // }
    // std::cout << ts.state;
    // std::cout.flush();
    // return 0;
  }

  void *add_torrent_thr(const char* inFile, const char* outPath, const char* seeder, const char* desc) {

    cout << "add_torrent_thr:: " << inFile << endl;

    // prepare param
    pthread_t threads;
    struct add_torrent_data add_p;
    add_p.inFile = inFile;

    // Create new thread
    int rc = pthread_create(&threads, NULL, add_torrent, (void *)&add_p);
    if (rc){
       cout << "Error:unable to create thread," << rc << endl;
       exit(-1);
    }
    cout << "add_torrent_thr:: END " << endl;
  }
}