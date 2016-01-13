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

  EXPORT create_torrent* new_create_torrent(file_storage* fs) {
    create_torrent t(*fs);
    return new create_torrent(t);
  }

  EXPORT void set_piece_hashes(create_torrent* ct, char const* outpath) {
    set_piece_hashes(*ct, outpath);
  }

  EXPORT std::vector<char>* bencode(create_torrent* ct) {
    std::vector<char> torrentBuffer;
    bencode(back_inserter(torrentBuffer), ct->generate());
    return new std::vector<char>(torrentBuffer);
  }

  EXPORT entry* generate(create_torrent* ct) {
    return new entry(ct->generate());
  }

  EXPORT void set_comment(create_torrent* ct, char const* str) {
    ct->set_comment(str);
  }
  EXPORT void set_creator(create_torrent* ct, char const* str) {
    ct->set_creator(str);
  }
  EXPORT void set_hash(create_torrent* ct, int index, sha1_hash const& h) {
    ct->set_hash(index, h);
  }
  EXPORT void set_file_hash(create_torrent* ct, int index, sha1_hash const& h) {
    ct->set_file_hash(index, h);
  }
  EXPORT void add_url_seed(create_torrent* ct, char const* url) {
    std::string str = url;
    ct->add_url_seed(str);
  }
  EXPORT void add_http_seed(create_torrent* ct, char const* url) {
    std::string str = url;
    ct->add_http_seed(str);
  }
  EXPORT void add_node(create_torrent* ct, std::pair<std::string, int> const& node) {
    ct->add_node(node);
  }
  EXPORT void add_tracker(create_torrent* ct, std::string const& url, int tier = 0) {
    ct->add_tracker(url, tier);
  }
  EXPORT void set_root_cert(create_torrent* ct, std::string const& pem) {
    ct->set_root_cert(pem);
  }
  EXPORT bool priv(create_torrent* ct) {
    return ct->priv();
  }
  EXPORT void set_priv(create_torrent* ct, bool p) {
    ct->set_priv(p);
  }
  EXPORT int num_pieces(create_torrent* ct) {
    return ct->num_pieces();
  }
  EXPORT int piece_length(create_torrent* ct) {
    return ct->piece_length();
  }
  EXPORT int piece_size(create_torrent* ct, int i) {
    return ct->piece_size(i);
  }
  EXPORT bool create_torrent_file(create_torrent* ct, char* filePath) {
    std::vector<char> torrent;
    std::string outfile(filePath);
    bencode(back_inserter(torrent), ct->generate());
    FILE* output = fopen(outfile.c_str(), "wb+"); 
    if (output == NULL)
    {
      fprintf(stderr, "failed to open file \"%s\": (%d) %s\n"
        , outfile.c_str(), errno, strerror(errno));
      return false;
    }
    fwrite(&torrent[0], 1, torrent.size(), output);
    fclose(output);
    return true;
  }
}