FROM node:8-slim

WORKDIR /server

COPY . /server
RUN npm install
RUN npm install typescript -g
RUN tsc

CMD [ "node", "dist" ]
