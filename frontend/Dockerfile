#FRONTEND


# Stage 1 build the frontend
FROM node:alpine as build-step

WORKDIR /app/frontend
COPY . .
RUN npm ci
RUN npm run build

# Stage 2 reverse proxy and web server
FROM caddy:2.7.6-alpine

EXPOSE 80
EXPOSE 443

COPY --from=build-step /app/frontend/build /svr
