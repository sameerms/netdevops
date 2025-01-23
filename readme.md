NetDevOps
Netbox, React

apiVersion: apps/v1
kind: Deployment
metadata:
  name: netbox-rest-api
  namespace: netbox
  annotations:
    linkerd.io/inject: enabled
spec:
  replicas: 1
  selector:
    matchLabels:
      app: netbox-rest-api
  template:
    metadata:
      labels:
        app: netbox-rest-api
    spec:
      containers:
      - name: netbox-rest-api
        image: netbox-rest-api:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "256Mi"
            cpu: "500m"
          limits:
            memory: "512Mi"
            cpu: "1000m"
---
apiVersion: v1
kind: Service
metadata:
  name: netbox-rest-api
  namespace: netbox
spec:
  selector:
    app: netbox-rest-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: NodePort
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
  labels:
    app: backend
  annotations:
    linkerd.io/inject: enabled
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: <HARBOR_DOMAIN>/project-name/backend-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
      imagePullSecrets:
      - name: harbor-registry-credentials