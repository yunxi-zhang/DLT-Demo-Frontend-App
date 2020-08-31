#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Create a new namespace"
kubectl create namespace ingress-basic
stepInfo "Add nginx helm chart repo"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
stepInfo "Install nginx helm chart"
helm install nginx-ingress ingress-nginx/ingress-nginx \
    --namespace ingress-basic \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set controller.admissionWebhooks.enabled=false

stepInfo "Install helm chart for this repo"
helm install --namespace ingress-basic r1 ./helmChart
stepInfo "Get pods with the new namespace"
kubectl get po --namespace ingress-basic
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace ingress-basic
stepInfo "Get services with the new namespace"
kubectl get svc --namespace ingress-basic
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace ingress-basic