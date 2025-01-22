#!/bin/bash
set -e

echo "Building REST API Docker image..."
docker build -t netbox-rest-api:latest .

echo "Pushing Docker image to Minikube registry..."
eval $(minikube docker-env)
docker tag netbox-rest-api:latest netbox-rest-api:latest
docker push netbox-rest-api:latest

echo "Deploying REST API to Kubernetes..."
kubectl apply -f netbox-rest-api.yaml

echo "REST API is deployed. Verify with 'kubectl get pods -n netbox'."
