FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./app ./app
COPY ./.env ./
CMD ["npm", "start"]
