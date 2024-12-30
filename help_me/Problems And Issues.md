# Problems and Issues Documentation

## Issue

- **Timestamp**: `I1227 15:48:52.821266`
- **Log Detail**:
  ```
  I1227 15:48:52.821266   27151 request.go:697] Waited for 1.070211133s due to client-side throttling, not priority and fairness, request: GET:https://kubernetes.docker.internal:6443/apis/apps/v1/namespaces/default/replicasets?labelSelector=app%3Dtickets
  ```
- **Problem Description**: The system experienced a delay caused by client-side throttling, which is unrelated to priority and fairness.
- **Request**: `GET: https://kubernetes.docker.internal:6443/apis/apps/v1/namespaces/default/replicasets?labelSelector=app%3Dtickets`

## Root Cause

The issue is related to incorrect or missing configuration of secrets for the ingress resource in the Kubernetes cluster. This could lead to client-side throttling when attempting to access resources.

## Solution

1. **Install Ingress**:
   Ensure that the ingress is properly installed and configured in the Kubernetes cluster. Use the following steps as a reference:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
   ```

   Verify that the ingress controller pods are running:

   ```bash
   kubectl get pods -n ingress-nginx
   ```

   Check the ingress controller logs for any errors or warnings to ensure it is running correctly:

   ```bash
   kubectl logs -n ingress-nginx <ingress-controller-pod-name>
   ```

2. **Set the Secrets Again**:
   Reconfigure the necessary secrets used by the ingress. This can be achieved by recreating the secrets:

   ```bash
   kubectl delete secret <secret-name>
   kubectl create secret generic <secret-name> --from-literal=key=value
   ```

   Replace `<secret-name>` and `key=value` with your specific values.

3. **Validate Configuration**:
   Confirm that the ingress resource is correctly configured and associated with the required services and secrets:

   ```bash
   kubectl describe ingress <ingress-name>
   ```

4. **Test the Setup**:
   After setting the secrets and configuring the ingress, verify that the endpoints are accessible without throttling issues.

   ```bash
   curl https://<your-ingress-url>
   ```

## Additional Notes

- Ensure that the Kubernetes cluster has adequate resources to handle requests and avoid client-side throttling.
- Regularly monitor the ingress controller and API server logs for potential issues.
