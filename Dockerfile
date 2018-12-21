FROM node:latest

RUN mkdir /src
WORKDIR /src


ADD package.json yarn.lock ./
RUN yarn install

ADD test.proto getter.js server.js mellan.js client.js ./

EXPOSE 8443

CMD ['node']

