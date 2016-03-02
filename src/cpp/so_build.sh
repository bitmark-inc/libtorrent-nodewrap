echo "compiling... add_torrent_params.so -----------------"
g++ -shared -fpic -o add_torrent_params.so -g add_torrent_params.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... alert.so -----------------"
g++ -shared -fpic -o alert.so -g alert.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... create_torrent.so -----------------"
g++ -shared -fpic -o create_torrent.so -g create_torrent.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... file_storage.so -----------------"
g++ -shared -fpic -o file_storage.so -g file_storage.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... peer_data.so -----------------"
g++ -shared -fpic -o peer_data.so -g peer_data.cpp -lboost_system -lboost_thread -ltorrent-rasterbar bitmark_plugin/bitmark_peer_data.cpp bitmark_plugin/tweetnacl.o -Wall -fpermissive -l json -lcurl
echo "compiling... session.so -----------------"
g++ -shared -fpic -o session.so -g session.cpp -lboost_system -lboost_thread -ltorrent-rasterbar bitmark_plugin/bitmark_plugin.cpp bitmark_plugin/bitmark_peer_data.cpp bitmark_plugin/tweetnacl.o -Wall -fpermissive -l json -lcurl
echo "compiling... session_settings.so -----------------"
g++ -shared -fpic -o session_settings.so -g session_settings.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... session_status.so -----------------"
g++ -shared -fpic -o session_status.so -g session_status.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... torrent_handle.so -----------------"
g++ -shared -fpic -o torrent_handle.so -g torrent_handle.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... torrent_info.so -----------------"
g++ -shared -fpic -o torrent_info.so -g torrent_info.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... torrent_status.so -----------------"
g++ -shared -fpic -o torrent_status.so -g torrent_status.cpp -lboost_system -lboost_thread -ltorrent-rasterbar
echo "compiling... utp_status.so -----------------"
g++ -shared -fpic -o utp_status.so -g utp_status.cpp -lboost_system -lboost_thread -ltorrent-rasterbar