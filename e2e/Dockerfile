# syntax=docker/dockerfile:1

FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY  pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY jest.config.ts jest.config.ts

COPY specs specs

RUN npm install -g pnpm

RUN pnpm install

CMD ["pnpm", "test"]