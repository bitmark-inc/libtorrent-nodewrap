// include C
#include <boost/shared_ptr.hpp>
#include "libtorrent/config.hpp"

// include bitmark
#include "bitmark_plugin/bitmark_peer_data.hpp"
#include "bitmark_plugin/bitmark_plugin.hpp"

using namespace libtorrent;
using namespace bitmark;

extern "C" {

  bitmark_plugin* new_bitmark_plugin() {
    return new bitmark_plugin();
  }

  void set_bitmark_peer_data(bitmark_plugin *bp, bitmark_peer_data *pd) {
    bp->set_bitmark_peer_data(pd);
  }

  boost::function<boost::shared_ptr<torrent_plugin>(torrent*, void*)> get_create_bitmark_plugin_function(bitmark_plugin *bp) {
    return bp->get_create_bitmark_plugin_function();
  }
}