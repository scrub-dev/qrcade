#BACKEND
FROM node:alpine

WORKDIR /app/backend

COPY . .

RUN npm ci
RUN npm run build
RUN node ./build/index.js

EXPOSE 5000
