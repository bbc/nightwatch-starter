#
# Nightwatch.js Dockerfile
#

FROM alpine:latest

ENV APP_DIR /home/nightwatch

# Node.js setup
RUN apk --no-cache add \
  nodejs \
  nodejs-npm \
  graphicsmagick \
  git

# Create mount points
VOLUME $APP_DIR/screenshots
VOLUME $APP_DIR/tests_outputs

# Copy Contents
COPY . $APP_DIR

# Change working directory
WORKDIR $APP_DIR

# Nightwatch
RUN npm install

# Run the tests
CMD /usr/bin/npm run remote