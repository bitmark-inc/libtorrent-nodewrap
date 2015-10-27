#ifndef TORRENT_MY_METADATA_TRANSFER_HPP_INCLUDED
#define TORRENT_MY_METADATA_TRANSFER_HPP_INCLUDED

#ifndef TORRENT_DISABLE_EXTENSIONS

#ifdef _MSC_VER
#pragma warning(push, 1)
#endif

#include <boost/shared_ptr.hpp>
#include <boost/function.hpp>
#include "libtorrent/config.hpp"

#include "bitmark_peer_data.hpp"



#ifdef _MSC_VER
#pragma warning(pop)
#endif

namespace libtorrent {
	struct torrent_plugin;
	class torrent;

#ifndef TORRENT_NO_DEPRECATE
	class bitmark_plugin
	{
	public:
		bitmark_plugin(){};
		~bitmark_plugin(){};

		void set_bitmark_peer_data(bitmark::bitmark_peer_data*);
		// define method create metadata plugin
		boost::function<boost::shared_ptr<torrent_plugin>(torrent*, void*)>
			get_create_bitmark_plugin_function();
	};

#endif
};

#endif // TORRENT_DISABLE_EXTENSIONS

#endif // TORRENT_MY_METADATA_TRANSFER_HPP_INCLUDED