[Back to Contents](index.md)

# Installation

* [Mac OSX](#mac-osx)
* [Windows](#windows)
* [Docker](#docker)

## Mac OSX 

* Clone the repository and navigate to it in the terminal
* Install the dependencies `npm install`
* Export your BrowserStack username and access key to your ```.bash_profile```
  * Username and Access Key can be found at: https://www.browserstack.com/accounts/settings
  * (Optional) To make permanent ```open ~/.bash_profile``` and add the lines below without the ```export```

  ```
  export BROWSERSTACK_USERNAME=<browserstack-username>
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```
* Install [GraphicsMagick](http://www.graphicsmagick.org/README.html#installation) via [this homebrew formula](http://brewformulas.org/Graphicsmagick)

## Windows

* Clone the repository
* Install node.js (v6+)
* Navigate to the folder within a command prompt and install the dependencies ```npm install```
* Set your BrowserStack username and access key by using ```setx```
  * Username and Access Key can be found at: https://www.browserstack.com/accounts/settings

  ```
  setx BROWSERSTACK_USERNAME <browserstack-username>
  setx BROWSERSTACK_ACCESS_KEY <browserstack-access-key>
  ```
* Install [GraphicsMagick](http://www.graphicsmagick.org/README.html#installation)

## Docker

* Update the ```.env``` file with your Browserstack Username and Access Key
* Install [Docker](https://www.docker.com/community-edition#/download) on your machine 
* From the command line, build the docker image with:
  ```docker build -t nightwatch .```
* Run the docker image with:
  ```docker run --env-file .env -it nightwatch```
