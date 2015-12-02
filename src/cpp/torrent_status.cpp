// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

using namespace libtorrent;

extern "C" {
  double get_progress(torrent_status *ts) {
  	return ts->progress;
  }
  int get_state(torrent_status *ts) {
  	return ts->state;
  }
  char* name(torrent_status *ts) {
  	return (char*)ts->name.c_str();
  }
}