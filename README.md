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
### Docker version
`docker build -t hbpmip/mipapitest .`

`ip addr | grep docker` to find your local docker ip

`docker run --name mipapitest--add-host="frontend:docker-ip" hbpmip/mipapitest`

### Install, build and run
see [pre-built installer for your platform](https://nodejs.org/en/download/)

#### install node
`npm install -g typescript`
or 
`yarn global add typescript`

#### install typescript
`npm install -g typescript`
or 
`yarn global add typescript`

#### compile
`tsc`

#### run
`node dist`
