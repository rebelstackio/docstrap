#!/bin/bash -e
set -a
BASH_DIR=${BASH_DIR:-/home/vagrant/docstrap/vagrant/scripts/}
LOG=${LOG:-/home/vagrant/docstrap/vagrant/tmp/log/boot.log}
set +a

NODE_VER=${NODE_VER:-10.x}

echo "starting provisioning..."
echo "NODE_VER: ${NODE_VER}"

ETH0IP=$(ifconfig -a eth0 | grep "inet addr:")

mkdir -p /vagrant/tmp/log

print_db_usage () {
  echo "Your node environment has been setup"
  echo "Networking: [ $ETH0IP ]"
  echo "Getting into the box (terminal):"
  echo "  vagrant ssh"
  echo ""
}

export DEBIAN_FRONTEND=noninteractive

PROVISIONED_ON=/etc/vm_provision_on_timestamp
if [ -f "$PROVISIONED_ON" ]
then
  echo "VM was already provisioned at: $(cat $PROVISIONED_ON)"
  echo "To run system updates manually login via 'vagrant ssh' and run 'apt-get update && apt-get upgrade'"
  echo ""
  print_db_usage
  exit
fi

mkdir -p /home/vagrant/.ssh
chmod 700 /home/vagrant/.ssh
chown -R vagrant:vagrant /home/vagrant/.ssh
su vagrant -c "rm -f ~/.ssh/id_rsa"
su vagrant -c "ssh-keygen -t rsa -P '' -f /home/vagrant/.ssh/id_rsa"

mkdir -p /home/vagrant/files/ssh
cp /home/vagrant/.ssh/id_rsa.pub /home/vagrant/files/ssh/`hostname`.pub

# install node
apt-get update
apt-get -y install build-essential
curl -sL "https://deb.nodesource.com/setup_$NODE_VER" | sudo -E bash -

echo "install node version ${NODE_VER}"
sudo apt-get install -y nodejs

# install watchtower
echo "install docstrap"
cd /home/vagrant/docstrap
npm install

# Tag the provision time:
date > "$PROVISIONED_ON"

echo "Successfully created node dev virtual machine"
echo ""
print_db_usage
