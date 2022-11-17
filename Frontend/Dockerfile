FROM node:18-alpine3.16 AS client_build_node

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]