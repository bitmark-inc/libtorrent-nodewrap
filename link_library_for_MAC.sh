#!/bin/bash

if [[ $OSTYPE == darwin* ]]; then
  echo "Copy *.dylib into the src folder ...."
  cp lib/osx/* src/cpp

  echo "link libtorrent-rasterbar"
  cd src/cpp
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib libboost_thread.dylib
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib libboost_thread.dylib
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib libtorrent-rasterbar.8.dylib

  echo "link libtorrent wrap"
  echo "session ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib session.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib session.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib session.dylib

  echo "add_torrent_params ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib add_torrent_params.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib add_torrent_params.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib add_torrent_params.dylib

  echo "create_torrent ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib create_torrent.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib create_torrent.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib create_torrent.dylib

  echo "file_storage ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib file_storage.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib file_storage.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib file_storage.dylib

  echo "session_status ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib session_status.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib session_status.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib session_status.dylib

  echo "torrent_handle ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib torrent_handle.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib torrent_handle.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib torrent_handle.dylib

  echo "torrent_info ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib torrent_info.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib torrent_info.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib torrent_info.dylib

  echo "torrent_status ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib torrent_status.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib torrent_status.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib torrent_status.dylib

  echo "utp_status ..."
  install_name_tool -change libboost_system.dylib @loader_path/libboost_system.dylib utp_status.dylib
  install_name_tool -change libboost_thread.dylib @loader_path/libboost_thread.dylib utp_status.dylib
  install_name_tool -change /usr/local/lib/libtorrent-rasterbar.8.dylib @loader_path/libtorrent-rasterbar.8.dylib utp_status.dylib
  cd ../../
fi
