FROM node:latest

RUN mkdir -p /usr/src/rentapp

WORKDIR /usr/src/rentapp

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 9000

CMD [ "node", "app.js" ]