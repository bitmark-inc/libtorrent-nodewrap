// include C
#include <string>
#include <stdio.h>
#include <stdlib.h>

#include <sys/types.h>
#include <unistd.h>

#include <boost/thread.hpp>
#include "libtorrent/alert.hpp"

using namespace libtorrent;
using namespace std;

extern "C" {
  char* message(alert *al) {
    return (char*)al->message().c_str();
  }
  int category(alert *al) {
    return al->category();
  }
  char* what(alert *al) {
    return (char*)al->what();
  }
  int type(alert *al) {
    return al->type();
  }
}