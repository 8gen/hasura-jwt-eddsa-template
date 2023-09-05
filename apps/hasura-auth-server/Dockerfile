FROM node:18-alpine

ARG NODE_AUTH_TOKEN 

WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./tsconfig.base.json ./
COPY ./.npmrc ./
RUN echo //npm.pkg.github.com/:_authToken=$NODE_AUTH_TOKEN >> ./.npmrc
COPY ./apps/hasura-auth-server/src ./apps/hasura-auth-server/src
COPY ./apps/hasura-auth-server/package.json ./apps/hasura-auth-server/
COPY ./apps/hasura-auth-server/tsconfig.json ./apps/hasura-auth-server/
COPY ./apps/hasura-auth-server/etsc.config.js ./apps/hasura-auth-server/
WORKDIR /usr/src/app/apps/hasura-auth-server
RUN apk add bash
RUN npm install -g pnpm
RUN pnpm install
RUN NODE_ENV=production npm run build

FROM node:18-alpine
COPY --from=0 /usr/src/app/apps/hasura-auth-server/build /usr/src/app/build
RUN npm install -g pg
WORKDIR /usr/src/app
CMD node build/index.js
