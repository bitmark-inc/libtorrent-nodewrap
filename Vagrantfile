# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# Url to box has been packaged on local
# use Python simple sesrver to share box file
# python -m SimpleHTTPServer 9300
# SHARED_BOX_URL = "http://xxx.xxx.xxx.xxx:<POST>/project.box"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.network :private_network, ip: "192.168.33.10"

  # forward port for node server
  config.vm.network :forwarded_port, guest: 3000, host: 3000

  # forward port for postgres
  config.vm.network :forwarded_port, guest: 5432, host: 5432

  # forward port for unit test
  config.vm.network :forwarded_port, guest: 8080, host: 8080
  config.vm.network :forwarded_port, guest: 5858, host: 5858

  # forward port for frontend
  config.vm.network :forwarded_port, guest: 9000, host: 9000

  # forward port for frontend
  config.vm.network :forwarded_port, guest: 35729, host: 35729

  # forward port for Torrent
  config.vm.network :forwarded_port, guest: 6882, host: 6882

  # Data folder
  config.vm.synced_folder "./", "/home/vagrant/libtorrent"

  # config.ssh.username = "vagrant"
  # config.ssh.password = "vagrant"

  # config.vm.provider "virtualbox" do |vb|
  #   vb.gui = true
  # end

  if defined?(SHARED_BOX_URL)
    config.vm.box = "amaryllis-amaryllis"
    config.vm.box_url = SHARED_BOX_URL
  else
    config.vm.box = "ubuntu-14.04-amd64.box"
    config.vm.box_url = "../../ubuntu-14.04-amd64.box"
    config.vm.provision "shell", :path => "bootstrap.sh", :privileged => false
  end


  config.vm.provider :virtualbox do |vb|
    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end
end