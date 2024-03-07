#FRONTEND
FROM node:alpine

WORKDIR /app/frontend

COPY . .

RUN npm ci
RUN npm run build
RUN npm install pm2 -g

EXPOSE 3000
