#!/bin/bash

# import common.sh
source ./common.sh

NAME_SPACE=dlt

stepInfo "Create a new namespace"
kubectl create namespace $NAME_SPACE
stepInfo "Add nginx helm chart repo"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
stepInfo "Install nginx helm chart"
helm install release1 ingress-nginx/ingress-nginx \
    --namespace $NAME_SPACE \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set controller.admissionWebhooks.enabled=false

stepInfo "Install helm chart for this repo"
helm install --namespace $NAME_SPACE r1 ./helmChart
stepInfo "Get pods with the new namespace"
kubectl get po --namespace $NAME_SPACE
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace $NAME_SPACE
stepInfo "Get services with the new namespace"
kubectl get svc --namespace $NAME_SPACE
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace $NAME_SPACE