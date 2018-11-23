# mip-api-tests

Create and run experiments through the API of the [MIP](https://github.com/LREN-CHUV/web-analytics-starter)

## Install, build and run

### install node and yarn

- see [pre-built installer for your platform](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/en/)

### install global dependencies

- `yarn global add typescript ts-node`

- `git submodule update --init --recursive`
- `cd portal-frontend/app/v3`
- `yarn install`

### install dependencies

in the root folder
`yarn install`

### compile && run tests

#### Create models (based on src/config)

`./start.sh model`

#### Create experiments (edit in src/config)

`./start.sh run`

#### Test each experiment output

`./start.sh test`

## Docker version

either run the `./run.sh` script or manually build and run:

`docker build -t hbpmip/mipapitest .`

`ip addr | grep docker` to find your local docker ip

`docker run --name mipapitest--add-host="frontend:docker-ip" hbpmip/mipapitest`
