FROM node:lts-alpine

RUN npm install -g npm@8.4.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install --force

# Copying source files
COPY . .

ARG ENV_FILE=.env
COPY enviroments/${ENV_FILE} ./.env

# Building app
RUN npm run build
EXPOSE 8080/tcp

# Running the app
CMD [ "npm", "run", "start" ]
