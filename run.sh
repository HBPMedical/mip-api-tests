#!/usr/bin/env sh

IP=`ip addr | grep docker | grep -oE '((1?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.){3}(1?[0-9][0-9]?|2[0-4][0-9]|25[0-5])' | head -n 1`
docker build -t hbpmip/mipapitest .
docker run --add-host="frontend:$IP" hbpmip/mipapitest
