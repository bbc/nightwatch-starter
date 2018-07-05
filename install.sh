#!/usr/bin/env bash

NIGHTWATCH_STARTER_TMP=/tmp/bbc/cd-nightwatch-starter
BASE_FOLDERS=(assertions commands pages tests)

# Grabbed from https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

read -p "Install Nightwatch to the current location? [n/Y]" choice
choice=${choice:-y}
if [[ $choice =~ ^[Yy]$ ]]; then
  echo "Installing Nightwatch..."
  
  # Clone starter repository
  echo "Cloning Nightwatch-starter repo into $NIGHTWATCH_STARTER_TMP"
  git clone git@github.com:bbc/cd-nightwatch-starter.git $NIGHTWATCH_STARTER_TMP

  # Global and package.json
  cp -R $NIGHTWATCH_STARTER_TMP""/setup_files/. $PWD

  # Create .env file
  # Single '>' removes any previous file
  echo BROWSERSTACK_USERNAME= > .env
  echo BROWSERSTACK_ACCESS_KEY= >> .env
  echo ENV=test. >> .env

  # Base folders
  for i in "${!BASE_FOLDERS[@]}"; do
    mkdir -p $PWD/${BASE_FOLDERS[i]}
    touch $PWD/${BASE_FOLDERS[i]}/.gitkeep
  done

  # NPM to install all the dependencies
  npm install

  # Remove the installer and starter repo
  echo "Removing Nightwatch-starter setup files."
  printf "${YELLOW}You might be asked for sudo password${NC}\n"

  sudo rm -r $NIGHTWATCH_STARTER_TMP
  if [ $? = 0 ]; then
    printf "${GREEN}DONE:${NC} Successfully removed $NIGHTWATCH_STARTER_TMP directory.\n"
  fi

  rm -f basename $0
  if [ $? = 0 ]; then
    printf "${GREEN}DONE:${NC} Successfully removed "`basename $0`"\n"
  fi
fi


