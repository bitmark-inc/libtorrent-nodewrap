#ifndef TORRENT_DISABLE_EXTENSIONS

#ifdef _MSC_VER
#pragma warning(push, 1)
#endif

#include <boost/shared_ptr.hpp>

#ifdef _MSC_VER
#pragma warning(pop)
#endif

#include <vector>
#include <utility>
#include <numeric>
#include <algorithm> // count
#include <json/json.h>

#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <curl/curl.h>

#include "libtorrent/peer_connection.hpp"
#include "libtorrent/bt_peer_connection.hpp"
#include "libtorrent/hasher.hpp"
#include "libtorrent/bencode.hpp"
#include "libtorrent/torrent.hpp"
#include "libtorrent/extensions.hpp"
#include "libtorrent/alert_types.hpp"
#include "libtorrent/buffer.hpp"
#include "libtorrent/entry.hpp"
#include "libtorrent/lazy_entry.hpp"


#include "bitmark_plugin.hpp"
#include "bitmark_peer_data.hpp"




namespace libtorrent
{
	//TODO check unnamed namespace
	namespace
	{
		bitmark::bitmark_peer_data* m_bpd;

		const char extension_name[] = "bitmark_metadata";

		struct bitmark_metadata_plugin : torrent_plugin
		{
			bitmark_metadata_plugin(torrent& t)
				:m_torrent(t)
			{
			}

			virtual boost::shared_ptr<peer_plugin> new_connection(peer_connection* pc);
			private:
				torrent& m_torrent;

		};

		struct bitmark_peer_plugin : peer_plugin
		{
			bitmark_peer_plugin(torrent& t, peer_connection& pc, bitmark_metadata_plugin& tp)
				:m_torrent(t)
				,m_pc(pc)
				,m_tp(tp)
			{
			}

			virtual char const* type() const
			{
				return extension_name;
			}

			virtual void add_handshake(entry& h)
			{
				entry& messages = h["m"];
				//add extension message
				std::string messageString = m_bpd->create_plugin_message();
				messages[extension_name] = messageString;
			}

			virtual bool on_extension_handshake(lazy_entry const& h)
			{
				if (h.type() != lazy_entry::dict_t) return false;
				lazy_entry const* messages = h.dict_find("m");
				if (!messages || messages->type() != lazy_entry::dict_t) return false;

				std::string signedMessageString = messages->dict_find_string_value(extension_name);

				bool resultCheck = true;

				std::string info_hash = m_torrent.torrent_file().info_hash().to_string();
				info_hash = bitmark::convert2HexString((unsigned char*)info_hash.c_str(), strlen(info_hash.c_str()));

				std::ostringstream str_tmp;
				str_tmp << m_pc.remote().address().to_string();
				str_tmp << ":";
				str_tmp << m_pc.remote().port();
				std::string peer_ip = str_tmp.str();

				if (m_bpd->check_allow_torrent_peer(info_hash, peer_ip)) {
					// peer contain in list peers allow to download
					return true;
				}

				if (signedMessageString.empty()) {
					resultCheck = false;
				} else {
					resultCheck = m_bpd->check_plugin_message(signedMessageString, info_hash);
				}

				if (resultCheck) {
					m_bpd->set_allow_torrent_peer(info_hash, peer_ip);
				}

				return true;
			}

			virtual bool on_request (peer_request const& pr)
			{
				std::string info_hash = m_torrent.torrent_file().info_hash().to_string();
				info_hash = bitmark::convert2HexString((unsigned char*)info_hash.c_str(), strlen(info_hash.c_str()));

				std::ostringstream str_tmp;
				str_tmp << m_pc.remote().address().to_string();
				str_tmp << ":";
				str_tmp << m_pc.remote().port();
				std::string peer_ip = str_tmp.str();

				if (m_bpd->check_allow_torrent_peer(info_hash, peer_ip)) {
					// peer contain in list peers allow to download
					return false;
				}
				// don't allow to peer download
				return true;

			}

			private:
				torrent& m_torrent;
				peer_connection& m_pc;
				bitmark_metadata_plugin& m_tp;
		};

		boost::shared_ptr<peer_plugin> bitmark_metadata_plugin::new_connection(peer_connection* pc) {
			if (pc->type() != peer_connection::bittorrent_connection) {
				return boost::shared_ptr<peer_plugin>();
			}
			return boost::shared_ptr<peer_plugin>(new bitmark_peer_plugin(m_torrent, *pc, *this));
		}

	}
}

namespace libtorrent
{
	//=========================================================================================

	boost::shared_ptr<torrent_plugin> create_bitmark_plugin(torrent* t, void*)
	{
		if (t->valid_metadata() && t->torrent_file().priv()) {
			return boost::shared_ptr<torrent_plugin>();
		}
		return boost::shared_ptr<torrent_plugin>(new bitmark_metadata_plugin(*t));
	}

	//=========================================================================================
	boost::function<boost::shared_ptr<torrent_plugin>(torrent*, void*)>
		bitmark_plugin::get_create_bitmark_plugin_function()
	{
		return &create_bitmark_plugin;
	}

	void bitmark_plugin::set_bitmark_peer_data(bitmark::bitmark_peer_data* bpd) {
		m_bpd = bpd;
	}



}

#endif //TORRENT_DISABLE_EXTENSIONS