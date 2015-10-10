// include C
#include <stdint.h>
#include <stdio.h>
#include <boost/thread.hpp>

#include <sys/types.h>
#include <unistd.h>

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

using namespace libtorrent;
using namespace std;

extern "C" {

  session* get_session_ptr()
  {
    return new session();
  }

  boost::intrusive_ptr<torrent_info> get_torrent_ptr()
  {
    boost::intrusive_ptr<torrent_info> info = NULL;
    return info;
  }

  sha1_hash* get_torrent_index()
  {
    sha1_hash *index;
    return index;
  }

  int listen_on(session *ses, int min_, int max_)
  {
    error_code ec;
    ses->listen_on(std::make_pair(min_, max_), ec);
    return ses->listen_port();
  }

  /*
    Create torrent file and add seeding it
    @ses - session: the pointer hold main session
    @info - boost::intrusive_ptr<torrent_info>
    @infile - string: path of torrent file
    @outpath - string: path of output file
    @creator - string: who created this torrent (seeder)
    @comment - string: Quick look about this torrent
  */
  torrent_handle* add_torrent(
    session *ses
    , boost::intrusive_ptr<torrent_info> &info
    , const char* infile
    , const char* outpath
    , const char* creator
    , const char* comment)
  {

    // Read file storage
    file_storage fs;
    add_files(fs, infile);

    // create torrent object
    create_torrent t(fs);
    t.set_creator(creator);
    t.set_comment(comment);
    set_piece_hashes(t, outpath);

    // create bencode
    std::vector<char> torrentBuffer;
    bencode(back_inserter(torrentBuffer), t.generate());

    error_code ec;

    // create torrent_info
    info = new torrent_info(&torrentBuffer[0], torrentBuffer.size(), ec);
    if (ec) {
      std::cout << ec.message();
    }

    // set value for torrent_params
    add_torrent_params p;
    p.save_path = outpath;
    p.ti = info;
    p.seed_mode = true;

    // add torrent
    torrent_handle th = ses->add_torrent(p, ec);
    if (ec) {
      std::cout << ec.message();
    }

    return new torrent_handle(th);
  }

  int start_dht(session *ses)
  {
    ses->start_dht();
  }

  int add_port_forwarding(session *ses, int _min, int _max)
  {
    ses->start_upnp();
    ses->start_natpmp();
    ses->add_port_mapping(session::udp, _min, _max);
  }

  int get_torrents(session *ses, std::vector<torrent_handle> &torrents)
  {
    torrents = ses->get_torrents();
    return 0;
  }

  torrent_handle* find_torrent(session *ses, torrent_handle *th) {
    sha1_hash info_hash = th->info_hash();
    torrent_handle th_tmp = ses->find_torrent(info_hash);
    return new torrent_handle(th_tmp);
  }

  int remove_torrent(session *ses, torrent_handle *th) {
    ses->remove_torrent(*th);
    return 0;
  }

  int get_downloading_progress(torrent_handle *th) {
    return th->status().progress;
  }
}