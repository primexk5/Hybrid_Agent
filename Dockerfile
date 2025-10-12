FROM node:24-alpine

WORKDIR /newking

COPY package*.json .

RUN npm install

COPY . .

CMD  ["npm", "run", "dev"]