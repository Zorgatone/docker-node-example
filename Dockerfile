FROM node:10.6-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install --quiet --only=production

COPY . .
