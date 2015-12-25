// include C
#include <libtorrent/create_torrent.hpp>
#include <libtorrent/file_storage.hpp>

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

using namespace libtorrent;

extern "C" {

  EXPORT file_storage* new_file_storage() {
    return new file_storage();
  }
  EXPORT void add_file_ipml(file_storage* fs, const char* datapath) {
    add_files(*fs, datapath);
  }
  EXPORT char const* file_name_ptr(file_storage* fs, int index) {
    return fs->file_name_ptr(index);
  }
  EXPORT int file_name_len(file_storage* fs, int index) {
    return fs->file_name_len(index); 
  }
  EXPORT void rename_file(file_storage* fs, int index, const char* new_filename) {
    fs->rename_file(index, new_filename);
  }
  EXPORT int num_files(file_storage* fs) {
    return fs->num_files();
  }
  EXPORT file_entry* at(file_storage* fs, int index) {
    return new file_entry(fs->at(index));
  }
}