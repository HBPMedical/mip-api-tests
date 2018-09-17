FROM node:8-slim

WORKDIR /server

COPY . /server
RUN npm install
RUN npm install typescript -g
RUN npm install tape -g
RUN npm install ts-node -g
RUN tsc

CMD [ "ts-node", "node_modules/tape/bin/tape", "index.ts" ]

