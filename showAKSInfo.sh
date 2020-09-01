#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Get pods with the new namespace"
kubectl get po --namespace ingress-nginx
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace ingress-nginx
stepInfo "Get services with the new namespace"
kubectl get svc --namespace ingress-nginx
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace ingress-nginx