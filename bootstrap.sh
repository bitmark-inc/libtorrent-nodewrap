echo 'Install git'
sudo apt-get install -y git-core

# config UTF-8 for server environment
sudo localedef -v -c -i en_US -f UTF-8 en_US.UTF-8 
sudo dpkg-reconfigure locales

# install postgres server
# https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-django-with-postgres-nginx-and-gunicorn
sudo apt-get install -y python-software-properties
sudo add-apt-repository ppa:pitti/postgresql
sudo apt-get update
sudo apt-get install -y libpq-dev python-dev
sudo apt-get install -y postgresql postgresql-contrib

#set password for postgres
sudo su - postgres psql && \password postgres

# check postgres server status
netstat -nlp | grep 5432

echo 'Install curl for installation tool'
sudo apt-get install -y curl

# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash
source ~/.nvm/nvm.sh

# install nodejs 4.0
nvm install 4.0
nvm use 4.0

echo 'Install express'
sudo npm install -g express
sudo npm link express

echo 'Install nodejs postgresql connector'
sudo npm install pg
