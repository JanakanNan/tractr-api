FROM node:10.19.0

WORKDIR /tractr-api
#Use the latest version of npm
RUN npm install npm@latest -g

#Install the nestJs CLI
RUN npm install -g @nestjs/cli

#Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000
CMD ["npm", "run", "start:dev"]