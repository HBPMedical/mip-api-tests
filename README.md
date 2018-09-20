# mip-api-tests

Create and run experiments through the API of the [MIP](https://github.com/LREN-CHUV/web-analytics-starter)

To test against local api, create and add a .env file to the root folder of the project with:
```
AUTHORIZATION = "Basic c2dhMXJldmlld2VyczpIQlBzZ2Ex"
BACKEND_URL = "http://frontend/services"
TRAININGDATASETS = "desd-synthdata"
# enable this if the MIP is in distributed mode
# VALIDATIONDATASETS = "qqni-synthdata,nida-synthdata"
```
## Docker version
either run th `./run.sh` script or manually build and run: 

`docker build -t hbpmip/mipapitest .`

`ip addr | grep docker` to find your local docker ip

`docker run --name mipapitest--add-host="frontend:docker-ip" hbpmip/mipapitest`

## Install, build and run
### install node
see [pre-built installer for your platform](https://nodejs.org/en/download/)

### install global dependencies
`npm install -g typescript ts-node`
or 
`yarn global add typescript  ts-node`

## install dependencies
`npm install` or `yarn install`

### compile && run tests

#### Create models (based on src/mocks.ts)
`ts-node node_modules/tape/bin/tape index.ts models`

#### Create experiments (edit in src/mocks)
`ts-node node_modules/tape/bin/tape index.ts run`

#### Test each experiment output
`ts-node node_modules/tape/bin/tape index.ts`
