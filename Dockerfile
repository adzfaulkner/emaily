FROM node:latest

RUN npm install -g create-react-app

COPY ./server /app

WORKDIR /app/server

EXPOSE 5000

ENTRYPOINT npm install && npm run dev