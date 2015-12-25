// include C
#include <boost/thread.hpp>
#include "libtorrent/session.hpp"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

using namespace libtorrent;

extern "C" {
  EXPORT double get_progress(torrent_status *ts) {
  	return ts->progress;
  }
  EXPORT int get_state(torrent_status *ts) {
  	return ts->state;
  }
  EXPORT char* name(torrent_status *ts) {
  	return (char*)ts->name.c_str();
  }
}