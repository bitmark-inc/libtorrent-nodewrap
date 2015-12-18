# libtorrent-nodewrap
============

Port of [Libtorrent](http://www.libtorrent.org/) to javascript Node.js.

Documentation
=============

* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)
	* [Session](#session)
	* [Torrent_Handle](#torrent_handle)
	* [Torrent Info](#torrent_info)
	* [Torrent Status](#torrent_status)
* [Examples](#examples)


Overview
--------

The primary goal of this project is to compile and wrap some of major functions of `Libtorrent` to the Node.js library with `node-ffi`.

System requirements
-------------------

Libtorrent-nodewrap.js currently just supports for Linux and OSx. (We're trying to build it to support on Windows OS):

Other systems:

* [Node.js](https://nodejs.org/en/) (we test on 0.10 and later)
* g++: Install g++ to compile C++ code
* [node-gyp](https://github.com/nodejs/node-gyp): native addon build tool

Installation
------------

You can install `libtorrent-nodewrap` via a package manager:

[NPM](https://www.npmjs.org/):

    $ npm install libtorrent-nodewrap

or [download source code](https://github.com/bitmark-inc/libtorrent-nodewrap).

* NOTE: When you want to use with node-webkit version, please install `nw-gyp` and run `nw-gyp rebuild -target=<version of nw>` inside folders `node_modules/ffi` and `node_modules/ref`

Usage
------

#####Session:

* **new_session()**: Initialize a libtorrent session and return a pointer of that session to node.js.
* **stop_session()**: Release memory of libtorrent session.
* **listen_on(int min_port, int max_port)**: Will change the listen port and/or the listen interface.
* **add_torrent(add_torrent_params p)**: You add torrents through the `add_torrent()` function where you give an object with all the parameters. The `add_torrent()` overloads will block until the torrent has been added (or failed to be added) and returns an error code and a `torrent_handle`
* **start_dht()**: Starts the dht node and makes the trackerless service available to torrents.
* **add_port_mapping(int protocol_type, int internal_port, int external_port)**: adds a port forwarding on UPnP and/or NAT-PMP, whichever is enabled. The return value is a handle referring to the port mapping that was just created.
* **start_upnp()**: can be used to add and remove arbitrary port mappings.
* **start_natpmp()**: can be used to add and remove arbitrary port mappings.
* **find_torrent(sha1 info_hash)**: looks for a torrent with the given `info-hash`. In case there is such a torrent in the session, a torrent_handle to that torrent is returned. In case the torrent cannot be found, an invalid `torrent_handle` is returned.
* **listen_port()**: returns the port we ended up listening on.
* **add_dht_node()**: adds a node to the routing table. This can be used if your client has its own source of bootstrapping nodes.
* **pop_alert()**:  is used to ask the `session` if any errors or events has occurred.

#####Torrent_handle:

* **is_valid()**: Returns true if this handle refers to a valid torrent and false if it hasn't been initialized or if the torrent it refers to has been aborted.
* **info_hash()**: returns the info-hash of the torrent.
* **status()**: will return a structure with information about the `status` of this torrent.
* **add_url_seed(string url)**: adds another url to the torrent's list of url seeds. If the given url already exists in that list, the call has no effect. The torrent will connect to the server and try to download pieces from it, unless it's paused, queued, checking or seeding.
* **connect_peer(string address, int port, int source)**: is a way to manually connect to peers that one believe is a part of the torrent. If the peer does not respond, or is not a member of this torrent, it will simply be disconnected.

#####Torrent_status:

* **get_progress()**: return a value in the range [0, 1], that represents the progress of the torrent's current task. It may be checking files or downloading.
* **get_state()**: the main state the torrent is in `torrent_status::state_t`.
* **name()**: the name of the torrent.

#####Torrent_info:

* **new_torrent_info_entry(entry* torrent_file)**: takes a `lazy_entry` will create a `torrent_info` object from the information found in the given torrent_file.
* **new_torrent_info_filename(string const* filename, int flags)**: takes a `filename` will simply load the torrent file and decode it inside the constructor, for convenience. This might not be the most suitable for applications that want to be able to report detailed errors on what might go wrong.
* **new_torrent_info_torrent_buffer(pointer torrentbuffer, int length, int flags)**: that takes a buffer pointer and a size will decode it as a .torrent file and initialize the torrent_info object for you.

#####Create_torrent:

* **new_create_torrent()**: Initialize a libtorrent `create_torrent` and return a pointer of that torrent to node.js.
* **set_piece_hashes(string outpath)**: This function will assume that the files added to the torrent file exists at path p, read those files and hash the content and set the hashes in the `create_torrent` object.
* **bencode()**: functions will encode data to `bencoded`.
* **set_comment(string comment)**: Sets the comment for the torrent.
* **set_creator(string creator)**: Sets the creator of the torrent.
* **add_url_seed(string url)**: This adds a url seed to the torrent. You can have any number of url seeds. For a single file torrent, this should be an HTTP url, pointing to a file with identical content as the file of the torrent. For a multi-file torrent, it should point to a directory containing a directory with the same name as this torrent, and all the files of the torrent in it.