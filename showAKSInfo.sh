#!/bin/bash

# import common.sh
source ./common.sh
NAME_SPACE=dlt

stepInfo "Get pods with the new namespace"
kubectl get po --namespace $NAME_SPACE
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace $NAME_SPACE
stepInfo "Get services with the new namespace"
kubectl get svc --namespace $NAME_SPACE
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace $NAME_SPACE
stepInfo "Show helm releases"
helm list --all-namespaces