# Estagio 1 - Responsável por gerar o build da nossa aplicação
FROM node as node
WORKDIR /app
COPY . .
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Responsável por expor nossa aplicação
FROM nginx
WORKDIR /usr/share/nginx/html
COPY --from=node /app/dist/frontend .
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
