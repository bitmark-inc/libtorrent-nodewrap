// include C
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>

#include <boost/thread.hpp>
#include "libtorrent/alert.hpp"

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#include <unistd.h>
#endif

using namespace libtorrent;
using namespace std;




extern "C" {
  EXPORT char* message(alert *al) {
    return (char*)al->message().c_str();
  }
  EXPORT int category(alert *al) {
    return al->category();
  }
  EXPORT char* what(alert *al) {
    return (char*)al->what();
  }
  EXPORT int type(alert *al) {
    return al->type();
  }
}