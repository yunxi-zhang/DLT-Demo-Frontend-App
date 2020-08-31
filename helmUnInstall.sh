#!/bin/bash

helm uninstall --namespace ingress-basic r1
helm uninstall  --namespace ingress-basic nginx-ingress