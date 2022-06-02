#!/bin/bash

COLOR_RED='\033[0;31m'
COLOR_YELLOW='\033[1;33m'
COLOR_GREEN='\033[1;32m'
COLOR_END='\033[0m'

echo -e "${COLOR_GREEN}Setting up Swiftly Stable..${COLOR_END}"
echo
echo -e "Please have your database and vhost details ready before starting this setup."
read -p "Press enter to continue >" READY
echo
echo

echo -e "${COLOR_YELLOW}Your email address (Admin email)${COLOR_END}"
read -p "Your email: " ADMIN_EMAIL
if [ -z "$ADMIN_EMAIL" ]; then
	echo -e "${COLOR_RED}Please specify a main URL for your server. ${COLOR_END}"
	exit 1
fi

echo -e "${COLOR_YELLOW}Please enter the main URL of this server (eg. swiftlystable.com)${COLOR_END}"
read -p "Main domain URL: " FRONTEND_URL
if [ -z "$FRONTEND_URL" ]; then
	echo -e "${COLOR_RED}Please specify a main URL for your server. ${COLOR_END}"
	exit 1
fi

echo -e "${COLOR_YELLOW}Please enter the API URL of this server (eg. api.swiftlystable.com)${COLOR_END}"
read -p "API domain URL: " CORS_SITE
if [ -z "$CORS_SITE" ]; then
	echo -e "${COLOR_RED}Please specify a API URL for your server. ${COLOR_END}"
	exit 1
fi

echo -e "${COLOR_YELLOW}Please enter a known Casper validator IP. Default (18.219.70.138)${COLOR_END}"
read -p "Node IP: " NODE_IP
if [ -z "$NODE_IP" ]; then
	NODE_IP="18.219.70.138"
fi

echo -e "${COLOR_YELLOW}Please enter your database hostname. Default (localhost)${COLOR_END}"
read -p "Database host: " DATABASE_HOST
if [ -z "$DATABASE_HOST" ]; then
	DATABASE_HOST="localhost"
fi

echo -e "${COLOR_YELLOW}Please enter your database user. Default (root) ${COLOR_END}"
read -p "Database username: " DATABASE_USER
if [ -z "$DATABASE_USER" ]; then
	DATABASE_USER="root"
fi

echo -e "${COLOR_YELLOW}Please enter your database password. ${COLOR_END}"
read -s -p "Database password: " DATABASE_PASSWORD
if [ -z "$DATABASE_PASSWORD" ]; then
	echo -e "${COLOR_RED}Please specify a password for your Mysql database. ${COLOR_END}"
	exit 1
fi

echo ''
cd api/

echo -e "${COLOR_GREEN}Generating entropy...${COLOR_END}"

RANDOM_ENTROPY=$(head -c 64 < /dev/urandom)
MASTER_KEY=$(echo $RANDOM_ENTROPY | md5sum | cut -d' ' -f1)
RANDOM_ENTROPY2=$(head -c 64 < /dev/urandom)
CRON_TOKEN=$(echo $RANDOM_ENTROPY2 | md5sum | cut -d' ' -f1)

echo -e "${COLOR_GREEN}Keys created${COLOR_END}"

if [ -f ".env" ]; then
	if [ -f ".env.backup" ]; then
		echo -e "${COLOR_YELLOW}.env.backup already exists${COLOR_END}"
	else
		cp .env .env.backup
	fi
fi

cp .env.example .env

echo -e "${COLOR_YELLOW}Configuring...${COLOR_END}"

sed -i "s/\[ADMIN_EMAIL\]/$ADMIN_EMAIL/g" .env
sed -i "s/\[FRONTEND_URL\]/$FRONTEND_URL/g" .env
sed -i "s/\[CORS_SITE\]/$CORS_SITE/g" .env
sed -i "s/\[NODE_IP\]/$NODE_IP/g" .env
sed -i "s/\[DB_HOST\]/$DATABASE_HOST/g" .env
sed -i "s/\[DB_USER\]/$DATABASE_USER/g" .env
sed -i "s/\[DB_PASS\]/$DATABASE_PASSWORD/g" .env
sed -i "s/\[MASTER_KEY\]/$MASTER_KEY/g" .env
sed -i "s/\[CRON_TOKEN\]/$CRON_TOKEN/g" .env

echo -e "${COLOR_YELLOW}Checking for required software...${COLOR_END}"

OS_VERSION=$(cat /etc/os-release | awk -F '=' '{print $2}' | tr -d '"' | sed -n '1 p')
OS_RELEASE=$(cat /etc/os-release | awk -F '=' '{print $2}' | tr -d '"' | sed -n '2 p' | cut -d'.' -f1)

if ! command -v apache2 &> /dev/null; then
	APACHE_VERSION=0
else
	APACHE_VERSION=$(apache2 -v | tr -d '\n' | cut -d'/' -f2 | cut -d'.' -f1)
fi

if ! command -v php &> /dev/null; then
	PHP_VERSION=0
else
	PHP_VERSION=$(php --version | cut -d' ' -f2 | tr -d '\n' | cut -d"." -f1)
fi

if ! command -v mysql &> /dev/null; then
	MYSQL_VERSION=0
else
	MYSQL_VERSION=$(mysql --version | cut -d'.' -f1 | awk '{print $3}')
fi

if ! command -v composer &> /dev/null; then
	COMPOSER_VERSION=0
else
	COMPOSER_VERSION=$(composer --version | cut -d' ' -f3 | cut -d'.' -f1)
fi

if ! command -v node &> /dev/null; then
	NODEJS_VERSION=0
else
	NODEJS_VERSION=$(node --version | cut -d'.' -f1 | tr -d 'v')
fi

if ! command -v npm &> /dev/null; then
	NPM_VERSION=0
else
	NPM_VERSION=$(npm --version | cut -d'.' -f1)
fi

if ! command -v yarn &> /dev/null; then
	YARN_VERSION=0
else
	YARN_VERSION=$(yarn --version | cut -d'.' -f1)
fi

if ! command -v casper-client &> /dev/null; then
	CASPERCLIENT_VERSION=0
else
	CASPERCLIENT_VERSION=$(casper-client --version | cut -d' ' -f3 | cut -d'.' -f1)
fi


if [ ! $OS_VERSION = 'Ubuntu' ]; then
	echo -e "${COLOR_RED}This software is only tested to work on Ubuntu systems${COLOR_END}"
	exit 1
fi

if [ $OS_RELEASE -lt 18 ]; then
	echo -e "${COLOR_RED}You are using Ubuntu version $OS_RELEASE. Please use at least Ubuntu version 18${COLOR_END}"
	exit 1
fi

if [ $MYSQL_VERSION -lt 5 ]; then
	echo -e "${COLOR_RED}You are using Mysql version $MYSQL_VERSION. Please install and configure at least Mysql version 5${COLOR_END}"
	exit 1
fi

if [ $APACHE_VERSION -lt 2 ]; then
	echo -e "${COLOR_YELLOW}Installing Apache2${COLOR_END}"
	sudo apt -y install apache2
	sudo apt -y install software-properties-common
else
	echo -e "${COLOR_GREEN}Apache installed${COLOR_END}"
fi

if [ $PHP_VERSION -lt 7 ]; then
	echo -e "${COLOR_YELLOW}Installing PHP 8.1${COLOR_END}"
	sudo add-apt-repository ppa:ondrej/php
	sudo apt-get update
	sudo apt-get install -y php8.1
	sudo apt-get install -y php8.1-{bcmath,bz2,intl,gd,mbstring,mysql,zip,common,curl,xml,gmp}
else
	echo -e "${COLOR_GREEN}PHP installed${COLOR_END}"
fi

if [ $CASPERCLIENT_VERSION -lt 1 ]; then
	echo -e "${COLOR_YELLOW}Installing Casper Client${COLOR_END}"
	echo "deb https://repo.casperlabs.io/releases" bionic main | sudo tee -a /etc/apt/sources.list.d/casper.list
	curl -O https://repo.casperlabs.io/casper-repo-pubkey.asc
	sudo apt-key add casper-repo-pubkey.asc
	sudo apt update
	sudo apt install casper-client
else
	echo -e "${COLOR_GREEN}Casper Client installed${COLOR_END}"
fi

sudo apt -y install curl
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo service apache2 restart
sudo chown -R www-data:www-data tmp/

if [ $COMPOSER_VERSION -lt 2 ]; then
	echo -e "${COLOR_YELLOW}Installing composer${COLOR_END}"
	curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
fi

composer install
composer update

cd ../frontend

if [ $NODEJS_VERSION -lt 16 ]; then
	echo -e "${COLOR_YELLOW}Installing NodeJS/NPM${COLOR_END}"
	curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
	sudo apt install nodejs -y
fi

if [ $YARN_VERSION -lt 1 ]; then
	echo -e "${COLOR_YELLOW}Installing Yarn${COLOR_END}"
	curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
	yarn install
fi

echo -e "${COLOR_YELLOW}Building frontend${COLOR_END}"
yarn install
yarn build

CURRENT_CRONS=$(crontab -l)

if [[ "$CURRENT_CRONS" == *"$CORS_SITE"* ]]; then
	echo -e "${COLOR_YELLOW}Crontab detected. Skipping${COLOR_END}"
else
	echo -e "${COLOR_YELLOW}Installing crontab${COLOR_END}"
	(crontab -l 2>>/dev/null; echo "* * * * * curl   -s $CORS_SITE/cron/schedule         -H 'Authorization: token $CRON_TOKEN' >> dev/null 2>&1") | crontab -
	(crontab -l 2>>/dev/null; echo "2 * * * * curl   -s $CORS_SITE/cron/garbage          -H 'Authorization: token $CRON_TOKEN' >> dev/null 2>&1") | crontab -
fi

echo -e "${COLOR_GREEN}[+] Done${COLOR_END}"
echo 
echo -e "Please note, you will still need to setup emailer credentials information in your api/.env before the email scheduler will work."

cd ..
