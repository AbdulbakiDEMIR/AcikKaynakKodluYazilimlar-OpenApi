# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]