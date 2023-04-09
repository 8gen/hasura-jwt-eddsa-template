FROM node:18-alpine

ARG NODE_AUTH_TOKEN 

WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./.npmrc ./
RUN echo //npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN >> ./.npmrc
COPY ./packages/hasura-auth-server/src ./packages/decryptor/src
COPY ./packages/hasura-auth-server/package.json ./packages/decryptor/
COPY ./packages/hasura-auth-server/etsc.config.js ./packages/decryptor/
WORKDIR /usr/src/app/packages/hasura-auth-server
RUN apk add bash
RUN yarn
RUN yarn run build

FROM node:18-alpine
COPY --from=0 /usr/src/app/packages/hasura-auth-server/build /usr/src/app/build
RUN npm install -g pg
WORKDIR /usr/src/app
CMD node build/index.js
