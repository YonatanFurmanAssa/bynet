FROM node:16.13.0-slim AS client_build_node

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent

RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]