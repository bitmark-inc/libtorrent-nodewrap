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
		bitmark_peer_data(){}
		~bitmark_peer_data(){}

		// wrap to nodejs
		void set_peer_data(std::string sk, std::string pk, std::string s_url)
		{
			secret_key = sk;
			public_key = pk;
			server_url = s_url;
		}

		// wrap to nodejs
		void add_bitmark_id(std::string bitmark_id, std::string info_hash)
		{
			m_map_bitmark_torrent[info_hash] = bitmark_id;
		}

		// wrap to nodejs
		void add_peer_pubkey(std::string peer_ip, std::string pubkey)
		{
			m_map_peer_pubkey[peer_ip] = pubkey;
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

		std::string get_bitmark_id(std::string info_hash)
		{
			std::string bitmark_id("");
			std::map<std::string, std::string>::iterator it;
			it = m_map_bitmark_torrent.find(info_hash);
			if (it != m_map_bitmark_torrent.end()) {
				bitmark_id =  it->second;
			}
			return bitmark_id;
		}

		std::string get_public_key(std::string peer_ip)
		{
			std::string pubkey("");
			std::map<std::string, std::string>::iterator it;
			it = m_map_peer_pubkey.find(peer_ip);
			if (it != m_map_peer_pubkey.end()) {
				pubkey =  it->second;
			}
			return pubkey;
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
		virtual std::string create_plugin_message(std::string info_hash, std::string peer_ip);
		virtual bool check_plugin_message(std::string, std::string);


	private:
		std::string secret_key;
		std::string public_key;
		std::string server_url;
		std::map<std::string, std::set<std::string> > m_map_allow_torrent_peer;
		std::map<std::string, std::string> m_map_bitmark_torrent;
		std::map<std::string, std::string> m_map_peer_pubkey;
	};

	unsigned char* convert2ByteArray(std::string hexStr, int * resultLenght);
	std::string convert2HexString(unsigned char *data, int len);
	//temp generate key
	void sign_keypair(std::string*, std::string*);
};
#endif