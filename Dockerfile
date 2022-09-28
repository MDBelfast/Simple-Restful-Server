FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#COPY init_user_db.sql ./init_user_db.sql

RUN npm install
RUN npm install knex --save
RUN npm install pg
RUN npm install express
RUN npm i cors express nodemon
RUN npm install body-parser --save
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
