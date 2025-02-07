FROM node:alpine3.20

COPY . /app

WORKDIR /app

RUN npm install --production

CMD [ "npm", "start" ]