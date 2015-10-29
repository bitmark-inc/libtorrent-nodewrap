#ifndef Included_bitmark_peer_data_IMPL_H
#define Included_bitmark_peer_data_IMPL_H

#include <stdlib.h>
#include <string.h>
#include <map>
#include <set>

namespace bitmark {

	class bitmark_peer_data
	{
	public:
		//==============constructor=========================
		bitmark_peer_data(){}
		~bitmark_peer_data(){};
		//==============constructor=========================

		//==============set=================================
		void set_peer_data(std::string sk, std::string pk, std::string s_url)
		{
			secret_key = sk;
			public_key = pk;
			server_url = s_url;
		}

		void set_torrent_peer(std::string info_hash, std::string ip){

			if (check_torrent_peer(info_hash, ip)) return;

			std::set<std::string> peer_set;
			std::map<std::string, std::set<std::string> >::iterator it;
			it = m_map_torrent_peer.find(info_hash);
  			if (it != m_map_torrent_peer.end()) {
  				peer_set =  it->second;
  			}
  			peer_set.insert(ip);

			m_map_torrent_peer[info_hash] = peer_set;
		}

		void set_allow_torrent_peer(std::string info_hash, std::string ip){

			if (check_allow_torrent_peer(info_hash, ip)) return;

			std::set<std::string> peer_set;
			std::map<std::string, std::set<std::string> >::iterator it;
			it = m_map_allow_torrent_peer.find(info_hash);
  			if (it != m_map_allow_torrent_peer.end()) {
  				peer_set =  it->second;
  			}
  			peer_set.insert(ip);

			m_map_allow_torrent_peer[info_hash] = peer_set;
		}

		//==============get=================================

		bool check_torrent_peer(std::string info_hash, std::string ip){

			std::set<std::string> peer_set;
			std::map<std::string, std::set<std::string> >::iterator it;
			it = m_map_torrent_peer.find(info_hash);
  			if (it != m_map_torrent_peer.end()) {
  				peer_set =  it->second;
  			}
  			if (peer_set.empty()) {
  				return false;
  			}

  			std::set<std::string>::iterator it_peer;
  			it_peer = peer_set.find(ip);
  			if (it_peer == peer_set.end()) {
  				 return false;
  			}
  			return true;
		}

		bool check_allow_torrent_peer(std::string info_hash, std::string ip){

			std::set<std::string> peer_set;
			std::map<std::string, std::set<std::string> >::iterator it;
			it = m_map_allow_torrent_peer.find(info_hash);
  			if (it != m_map_allow_torrent_peer.end()) {
  				peer_set =  it->second;
  			}
  			if (peer_set.empty()) {
  				return false;
  			}

  			std::set<std::string>::iterator it_peer;
  			it_peer = peer_set.find(ip);
  			if (it_peer == peer_set.end()) {
  				 return false;
  			}
  			return true;
		}




		//==============virtual=================================
		virtual std::string create_plugin_message();
		virtual bool check_plugin_message(std::string, std::string);


	private:
		std::string secret_key;
		std::string public_key;
		std::string server_url;
		std::map<std::string, std::set<std::string> > m_map_torrent_peer;
		std::map<std::string, std::set<std::string> > m_map_allow_torrent_peer;
	};

	unsigned char* convert2ByteArray(std::string hexStr, int * resultLenght);
	std::string convert2HexString(unsigned char *data, int len);
	//temp generate key
	void sign_keypair(std::string*, std::string*);
};
#endif