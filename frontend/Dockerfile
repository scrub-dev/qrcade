#FRONTEND


# Stage 1 build the frontend
FROM node:alpine as build-step

WORKDIR /app/frontend
COPY . .
RUN npm run build


EXPOSE 80
EXPOSE 443
# Stage 2 reverse proxy and web server
FROM caddy:2.7.6-alpine
COPY --from=build-step /app/frontend/build /svr
