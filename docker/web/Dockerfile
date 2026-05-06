# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=22
ARG NGINX_VERSION=1.27

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

ARG FRONTEND_APP_PATH=src/ClientApp
ARG FRONTEND_DIST_PATH=dist

COPY ${FRONTEND_APP_PATH}/package*.json ./
RUN npm ci

COPY ${FRONTEND_APP_PATH}/ ./
RUN npm run build -- --configuration production
RUN mkdir -p /app/out && cp -R "${FRONTEND_DIST_PATH}/." /app/out/

FROM nginx:${NGINX_VERSION}-alpine AS runtime

COPY docker/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out/ /usr/share/nginx/html/

EXPOSE 80
