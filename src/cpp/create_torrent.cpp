// include C
#include <libtorrent/create_torrent.hpp>
#include <libtorrent/file_storage.hpp>

using namespace libtorrent;

extern "C" {

  create_torrent* new_create_torrent(file_storage* fs) {
    create_torrent t(*fs);
    return new create_torrent(t);
  }

  std::vector<char> bencode(create_torrent* ct, char const* outpath) {
    set_piece_hashes(*ct, outpath);

    std::vector<char> torrentBuffer;
    bencode(back_inserter(torrentBuffer), ct->generate());
  }

  entry* generate(create_torrent* ct) {
    return new entry(ct->generate());
  }

  void set_comment(create_torrent* ct, char const* str) {
    ct->set_comment(str);
  }
  void set_creator(create_torrent* ct, char const* str) {
    ct->set_creator(str);
  }
  void set_hash(create_torrent* ct, int index, sha1_hash const& h) {
    ct->set_hash(index, h);
  }
  void set_file_hash(create_torrent* ct, int index, sha1_hash const& h) {
    ct->set_file_hash(index, h);
  }
  void add_url_seed(create_torrent* ct, char const* url) {
    std::string str = url;
    ct->add_url_seed(str);
  }
  void add_http_seed(create_torrent* ct, char const* url) {
    std::string str = url;
    ct->add_http_seed(str);
  }
  void add_node(create_torrent* ct, std::pair<std::string, int> const& node) {
    ct->add_node(node);
  }
  void add_tracker(create_torrent* ct, std::string const& url, int tier = 0) {
    ct->add_tracker(url, tier);
  }
  void set_root_cert(create_torrent* ct, std::string const& pem) {
    ct->set_root_cert(pem);
  }
  bool priv(create_torrent* ct) {
    ct->priv();
  }
  void set_priv(create_torrent* ct, bool p) {
    ct->set_priv(p);
  }
  int num_pieces(create_torrent* ct) {
    ct->num_pieces();
  }
  int piece_length(create_torrent* ct) {
    ct->piece_length();
  }
  int piece_size(create_torrent* ct, int i) {
    ct->piece_size(i);
  }
}