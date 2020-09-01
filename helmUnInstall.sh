#!/bin/bash

helm uninstall --namespace ingress-nginx r1
helm uninstall  --namespace ingress-nginx nginx-ingress