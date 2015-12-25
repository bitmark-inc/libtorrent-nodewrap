// include C
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#include <unistd.h>
#endif

// include bitmark
#include "bitmark_plugin/bitmark_peer_data.hpp"

using namespace bitmark;

extern "C" {
  EXPORT bitmark_peer_data* new_peer_data() {
    return new bitmark_peer_data();
  }
  EXPORT void set_peer_data(bitmark_peer_data *pd, char *sk, char *pk, char *s_url) {
    std::string str_sk = sk;
    std::string str_pk = pk;
    std::string str_s_url = s_url;
    pd->set_peer_data(str_sk, str_pk, str_s_url);
  }
  EXPORT void add_bitmark_id(bitmark_peer_data *pd, char *bitmark_id, char *info_hash) {
  	std::string str_bitmark_id = bitmark_id;
    std::string str_info_hash = info_hash;
    pd->add_bitmark_id(str_bitmark_id, str_info_hash);
  }
  EXPORT void add_peer_pubkey(bitmark_peer_data *pd, char *peer_ip, char *pk) {
  	std::string str_pk = pk;
    std::string str_peer_ip = peer_ip;
    pd->add_peer_pubkey(str_peer_ip, pk);
  }
}