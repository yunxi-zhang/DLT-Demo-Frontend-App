#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Install npm dependencies"
npm install

stepInfo "Run app"
npm start