#!/bin/bash
set -e

echo "Adding NetBox Helm repo..."
helm repo add netbox https://charts.netbox.oss.netboxlabs.com/
helm repo update

echo "Deploying NetBox..."
kubectl create namespace netbox || true
helm install netbox netbox/netbox --namespace netbox -f values.yaml

echo "NetBox is deployed. Verify with 'kubectl get pods -n netbox'."
