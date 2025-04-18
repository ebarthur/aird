# syntax=docker/dockerfile:1

FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY  pnpm-lock.yaml ./

RUN npm i install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY  pnpm-lock.yaml ./

RUN npm i install -g pnpm

RUN pnpm install

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/auth/main" ]