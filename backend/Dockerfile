#BACKEND
FROM node:alpine

WORKDIR /app/backend

COPY . .

RUN npm ci
RUN npm run build
RUN npm install pm2 -g

EXPOSE 5000
