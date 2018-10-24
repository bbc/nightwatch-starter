[Back to Contents](index.md)

# How To Run

## Environment Variables

The following are the various environment variables that can be set

* `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` are your Browserstack credentials
* `CHROME_HEADLESS` can be set to any value to be 'headless'
* `ENV` is the environment we want to test against, usually `int.`, `test.` and blank for live
* `LOCAL` is the url when we want to run against a build that is local to the machine

## Run all Tests

To run the tests you can use any of the following:

* ```npm run local``` - runs all the tests locally through Chrome
* ```npm run remote``` - runs all the tests on BrowserStack
* ```npm run proxy``` - runs all the tests on BrowserStack whilst on Reith
* ```npm run dev``` - runs all the tests locally through Chrome against a developer build
* ```npm run dev-remote``` - runs all the tests on BrowserStack against a developer build

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
