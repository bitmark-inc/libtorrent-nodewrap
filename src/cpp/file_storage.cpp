// include C
#include <libtorrent/create_torrent.hpp>
#include <libtorrent/file_storage.hpp>

using namespace libtorrent;

extern "C" {

  file_storage* new_file_storage() {
    return new file_storage();
  }
  void add_file_ipml(file_storage* fs, const char* datapath) {
    add_files(*fs, datapath);
  }
  char const* file_name_ptr(file_storage* fs, int index) {
    return fs->file_name_ptr(index);
  }
  int file_name_len(file_storage* fs, int index) {
    return fs->file_name_len(index); 
  }
  void rename_file(file_storage* fs, int index, const char* new_filename) {
    fs->rename_file(index, new_filename);
  }
  int num_files(file_storage* fs) {
    return fs->num_files();
  }
  file_entry* at (file_storage* fs, int index) {
    return new file_entry(fs->at(index));
  }
}