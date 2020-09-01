#!/bin/bash

NAME_SPACE=dlt

helm uninstall --namespace $NAME_SPACE r1
helm uninstall  --namespace $NAME_SPACE release1