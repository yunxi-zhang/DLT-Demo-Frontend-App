#!/bin/bash

# import common.sh
source ./common.sh

stepInfo "Get pods with the new namespace"
kubectl get po --namespace ingress-basic
stepInfo "Get deployments with the new namespace"
kubectl get deploy --namespace ingress-basic
stepInfo "Get services with the new namespace"
kubectl get svc --namespace ingress-basic
stepInfo "Get ingress with the new namespace"
kubectl get ingress --namespace ingress-basic