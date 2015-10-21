// include C
#include <libtorrent/create_torrent.hpp>
#include <libtorrent/file_storage.hpp>

using namespace libtorrent;

extern "C" {

  file_storage* new_file_storage() {
    return new file_storage();
  }

  void add_file_ipml(file_storage* fs, const char* infile) {
    add_files(*fs, infile);
  }
  char const* file_name_ptr(file_storage* fs, int index) {
    return fs->file_name_ptr(index);
  }
  int file_name_len(file_storage* fs, int index) {
    return fs->file_name_len(index); 
  }
}