#
# Nightwatch.js Dockerfile
#

FROM node:10.12.0-alpine

ENV APP_DIR /nightwatch

# Node.js setup
RUN apk --no-cache add \
  graphicsmagick \
  git

# Copy package.json and install dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install

# Copy node_modules
RUN mkdir -p $APP_DIR && cp -a /tmp/node_modules $APP_DIR

# Change working directory
WORKDIR $APP_DIR
COPY . $APP_DIR

# Nightwatch  
RUN npm ci

# Run Tests
CMD npm run remote