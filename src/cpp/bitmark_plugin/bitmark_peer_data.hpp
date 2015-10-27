#ifndef Included_bitmark_peer_data_IMPL_H
#define Included_bitmark_peer_data_IMPL_H

#include <stdlib.h>
#include <string.h>
#include <map>

namespace bitmark {

	class bitmark_peer_data
	{
	public:
		//==============constructor=========================
		bitmark_peer_data(){}
		~bitmark_peer_data(){};
		//==============constructor=========================

		//==============set=================================
		void set_peer_data(std::string pd)
		{
			m_peer_data = pd;
		}

		void set_status_torrent(const char *info_hash, std::string status)
		{
			std::string temp(info_hash);
			m_map_torrent[temp] = status;
		}

		//==============get=================================
		std::string get_peer_data()
		{
			return m_peer_data;
		}

		std::string get_status_torrent(std::string info_hash)
		{
			std::map<std::string, std::string>::iterator it;
			it = m_map_torrent.find(info_hash);
  			if (it != m_map_torrent.end()) {
  				return it->second;
  			}
  			return std::string("");
		}

		std::string get_server_url() {
			return server_url;
		}

		//==============virtual=================================
		virtual void parse_peer_data();
		virtual std::string create_plugin_message();
		virtual bool check_plugin_message(std::string, std::string);


	private:
		std::string m_peer_data;
		std::string secret_key;
		std::string public_key;
		std::string server_url;
		std::map<std::string, std::string> m_map_torrent;
	};

	unsigned char* convert2ByteArray(std::string hexStr, int * resultLenght);
	std::string convert2HexString(unsigned char *data, int len);
	//temp generate key
	void sign_keypair(std::string*, std::string*);
};
#endif