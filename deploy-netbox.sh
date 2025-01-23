#!/bin/bash
set -e

# Update Helm repositories
helm repo update

# Add Linkerd Helm repository
echo "Adding Linkerd Helm repository..."
helm repo add linkerd https://helm.linkerd.io/stable
helm repo update

# Install Linkerd control plane using Helm
echo "Installing Linkerd control plane..."
helm install linkerd2 linkerd/linkerd2 --namespace linkerd --create-namespace

# Wait for Linkerd control plane to be ready
kubectl wait --for=condition=available --timeout=600s deployment/linkerd-controller -n linkerd

# Annotate the NetBox namespace for Linkerd injection
echo "Annotating NetBox namespace for Linkerd injection..."
kubectl create namespace netbox || true
kubectl annotate namespace netbox linkerd.io/inject=enabled

# Deploy NetBox with Helm
echo "Deploying NetBox..."
helm install netbox netbox/netbox --namespace netbox -f values.yaml

echo "NetBox is deployed. Verify with 'kubectl get pods -n netbox'."

# Add Harbor repository and deploy Harbor
echo "Adding Harbor repository..."
helm repo add harbor https://helm.goharbor.io
helm repo update
helm install harbor harbor/harbor --namespace harbor --create-namespace

echo "Harbor is deployed. Verify with 'kubectl get pods -n harbor'."