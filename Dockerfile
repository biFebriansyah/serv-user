FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/rentapp

COPY package*.json ./

COPY . .

RUN npm install

RUN npm audit fix

EXPOSE 9000

CMD [ "node", "app.js" ]