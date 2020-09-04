#!/bin/bash

docker rmi dlt-demo-frontend-app:0.1
docker build -t dlt-demo-frontend-app:0.1 .
docker run -dt -p 3000:3000 -v ${PWD}/.env:/app/.env --name dlt-demo-frontend-app dlt-demo-frontend-app:0.1