import sys
import time
import libtorrent as lt

fs = lt.file_storage()
lt.add_files(fs, "/home/vagrant/test.txt")
t = lt.create_torrent(fs)
t.set_creator("Test Creator")
t.set_comment("Test Comment")
lt.set_piece_hashes(t, "/home/vagrant/")
torrent = t.generate()
info = lt.torrent_info(torrent)
magnet = lt.make_magnet_uri(info)
print magnet

ses = lt.session()
ses.listen_on(6881, 6881)
handle = ses.add_torrent({'ti': info, 'save_path': '/home/vagrant', 'seed_mode': True})
ses.start_dht()
# ses.start_upnp()
# ses.start_natpmp()
# ses.add_port_mapping(lt.session.protocol_type.udp, 6881, 6881);

while handle.is_seed():
  s = handle.status()
  state_str = ['queued', 'checking', 'downloading metadata', \
    'downloading', 'finished', 'seeding', 'allocating', 'checking fastresume']

  print('\r%.2f%% complete (down: %.1f kb/s up: %.1f kB/s peers: %d) %s' % \
    (s.progress * 100, s.download_rate / 1000, s.upload_rate / 1000, s.num_peers, state_str[s.state]))
  sys.stdout.flush()

  time.sleep(1)