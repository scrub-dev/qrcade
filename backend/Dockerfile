#BACKEND
FROM node:alpine

WORKDIR /app/backend

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 5000
