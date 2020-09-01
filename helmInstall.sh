#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Create a new namespace"
kubectl create namespace ingress-nginx
stepInfo "Add nginx helm chart repo"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
stepInfo "Install nginx helm chart"
helm install release1 ingress-nginx/ingress-nginx \
    --namespace ingress-nginx \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set controller.admissionWebhooks.enabled=false

stepInfo "Install helm chart for this repo"
helm install --namespace ingress-nginx r1 ./helmChart
stepInfo "Get pods with the new namespace"
kubectl get po --namespace ingress-nginx
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace ingress-nginx
stepInfo "Get services with the new namespace"
kubectl get svc --namespace ingress-nginx
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace ingress-nginx