#!/bin/bash

docker rmi dlt-react-app:1.0
docker build -t dlt-react-app:1.0 .
docker run -dt -p 3000:3000 -v ${PWD}/.env:/app/.env --name dlt_react_app dlt-react-app:1.0