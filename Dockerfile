# build environment
FROM node:13.12.0-alpine as build-stage
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
