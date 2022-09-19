FROM node:18-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --global

COPY . /app

COPY nginx.log /app

RUN mkdir -p /logs

CMD node parseToCsv.js