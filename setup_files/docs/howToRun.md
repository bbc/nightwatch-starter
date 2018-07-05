[Back to Contents](index.md)

# How To Run

## Run all Tests

To run the tests you can use any of the following:

* ```npm run local``` - runs all the tests locally through Chrome
* ```npm run remote``` - runs all the tests on BrowserStack
* ```npm run proxy``` - runs all the tests on BrowserStack whilst on Reith

## Run Specific Tests

All tests should have a ```tag``` at the top of the test suite, this is the name required to run those specific tests. So if for example a test contains the tag ```templates``` then to run the template tests only, you would use the command:

  npm run <environment> -- --tag templates

N.B. There is an additional ```--``` required to run the tags.

## Docker 

* From the command line, build the docker image with:
  ```docker build -t nightwatch .```
* Run the docker image with:
  ```docker run --env-file .env -v $(PWD)/tests_output:/home/nightwatch/tests_output -v $(PWD)/screenshots:/home/nightwatch/screenshots -it nightwatch```

## Jenkins

* In the Build -> Execute Shell section
  ```
    echo BROWSERSTACK_USERNAME=... > .env
    echo BROWSERSTACK_ACCESS_KEY=... >> .env

    # Build the docker image
    docker build -t $JOB_NAME .

    # Run the docker image with the .env file
    docker run --env-file .env -v $WORKSPACE/tests_output:/home/nightwatch/tests_output -v $WORKSPACE/screenshots:/home/nightwatch/screenshots -i $JOB_NAME
  ```
* In the Post-build Actions section
  ```
    tests_output/*.xml
  ```
