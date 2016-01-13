// include C
#include <stdint.h>
#include <stdio.h>
#include <boost/thread.hpp>
#include <boost/function.hpp>
#include <iostream>

#include <sys/types.h>
#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#include <unistd.h>
#endif

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

#include "bitmark_plugin/bitmark_plugin.hpp"
#include "bitmark_plugin/bitmark_peer_data.hpp"

using namespace libtorrent;
using namespace bitmark;
using namespace std;

extern "C" {

  enum listen_on_flags_t
  {
    listen_no_system_port,
  };

  enum options_t
  {
    delete_files,
  };

  enum session_flags_t
  {
    add_default_plugins,
    start_default_features,
  };

  enum protocol_type
  {
    udp,
    tcp,
  };

  /* START Constructor */
  EXPORT session* new_session()
  {
    return new session();
  }

  // session* new_session_1(fingerprint const& print = fingerprint("LT"
  //     , LIBTORRENT_VERSION_MAJOR, LIBTORRENT_VERSION_MINOR, 0, 0)
  //     , int flags = start_default_features | add_default_plugins
  //     , boost::uint32_t alert_mask = alert::error_notification) {
  //   return new session(fingerprint, flags, alert_mask);
  // }

  // session* new_session_2(fingerprint const& print
  //     , int _min
  //     , int _max
  //     , char const* listen_interface = "0.0.0.0"
  //     , int flags = start_default_features | add_default_plugins
  //     , int alert_mask = alert::error_notification) {
  //   std::pair<int, int> listen_port_range = std::make_pair(_min, _max);
  //   return new session(fingerprint, listen_port_range, listen_interface, flags, alert_mask);
  // }

  /* END Constructor */

  EXPORT void stop_session(session *s) {
    delete s;
  }

  EXPORT void listen_on(session *ses, int _min, int _max)
  {
    libtorrent::error_code ec;
    ses->listen_on(std::make_pair(_min, _max), ec);
  }

  EXPORT torrent_handle* add_torrent(session *ses, add_torrent_params *p) {
    libtorrent::error_code ec;
    torrent_handle th = ses->add_torrent(*p, ec);
    if (ec) {
      std::cout << ec.message() << std::endl;
    }
    return new torrent_handle(th);
  }

  EXPORT void start_dht(session *ses)
  {
    ses->start_dht();
  }

  /*
   * Function:  add_port_mapping 
   * --------------------
   * add_port_mapping adds a port forwarding on UPnP and/or NAT-PMP, whichever is enabled.
   *
   *  protocol_type: 1: udp, 2: tcp
   *  internal_port
   *  external_port
   *
   * The return value is a handle referring to the port mapping that was just created
   */
  EXPORT void add_port_mapping(session *ses, int type, int internal_port, int external_port)
  {
    session::protocol_type protocol_type = session::tcp;
    if(type == 1) {
      protocol_type = session::udp;
    }
    ses->add_port_mapping(protocol_type, internal_port, external_port);
  }

  EXPORT void start_upnp(session *ses) {
    ses->start_upnp();
  }

  EXPORT void start_natpmp(session *ses) {
    ses->start_natpmp();
  }

  EXPORT torrent_handle* find_torrent(session *ses, torrent_handle *th) {
    sha1_hash info_hash = th->info_hash();
    torrent_handle th_tmp = ses->find_torrent(info_hash);
    return new torrent_handle(th_tmp);
  }

  EXPORT short listen_port(session *ses) {
    return ses->listen_port();
  }

  EXPORT void add_extension(session *ses, bitmark_peer_data *bpd) {
    //add plug in
    bitmark_plugin bp;
    bp.set_bitmark_peer_data(bpd);
    ses->add_extension(bp.get_create_bitmark_plugin_function());
  }

  EXPORT void add_dht_node(session *ses, char *addr, int port) {
    std::string addr_str = addr;
    ses->add_dht_node(std::make_pair(addr_str, port));
  }

  EXPORT alert* pop_alert(session *ses) {
    return ses->pop_alert().release();
  }

  EXPORT session_settings* get_setting_high_performance_seed() {
    session_settings temp = high_performance_seed();
    return new session_settings(temp);
  }

  EXPORT void set_settings(session *ses, session_settings *setting) {
    const session_settings temp(*setting);
    ses->set_settings(temp);
  }

  EXPORT session_settings* settings(session *ses) {
    session_settings temp = ses->settings();
    return new session_settings(temp);
  }
}