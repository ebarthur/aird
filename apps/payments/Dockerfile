# syntax=docker/dockerfile:1

FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY  pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm i install -g pnpm

COPY apps/payments apps/payments
COPY @core @core

RUN pnpm install -r

RUN pnpm run build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY  pnpm-lock.yaml ./

RUN npm i install -g pnpm

RUN pnpm install

COPY --from=development /usr/src/app/dist ./dist
COPY proto proto

CMD [ "node", "dist/apps/payments/main" ]