// include C
#include <string>
#include <stdio.h>
#include <stdlib.h>

#include <sys/types.h>
#include <unistd.h>

// include bitmark
#include "bitmark_plugin/bitmark_peer_data.hpp"

using namespace bitmark;

extern "C" {
  bitmark_peer_data* new_peer_data() {
    return new bitmark_peer_data();
  }
  void set_peer_data(bitmark_peer_data *pd, char *data) {
    std::string str = data;
    pd->set_peer_data(str);
  }
  void parse_peer_data(bitmark_peer_data *pd) {
    pd->parse_peer_data();
  }
}