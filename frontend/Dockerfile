#FRONTEND
FROM node:alpine

WORKDIR /app/frontend

COPY . .

RUN npm ci
#RUN npm run build
#RUN npm install pm2 -g
RUN npm run dev

EXPOSE 3000
