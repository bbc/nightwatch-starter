#
# Nightwatch.js Dockerfile
#

FROM node:8.11.4-alpine

ENV APP_DIR /home/nightwatch

# Node.js setup
RUN apk --no-cache add \
  graphicsmagick \
  git

# Copy Contents
COPY . $APP_DIR

# Change working directory
WORKDIR $APP_DIR

# Nightwatch
RUN npm install

# Run Tests
RUN npm run remote