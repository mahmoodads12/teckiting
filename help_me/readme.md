# Auth Service Project 🌐

Dieses Projekt implementiert einen Authentifizierungsservice mit TypeScript und Express, der in Docker und Kubernetes integriert ist und durch NGINX Ingress konfiguriert wurde.

## 📥 Herunterladen & Installieren

1. **Repository klonen**:

   ```bash
   git clone <repository-url>
   cd auth
   ```

2. **Abhängigkeiten installieren**:

   ```bash
   npm install -g typescript ts-node
   npm install --save-dev @types/node
   ```

3. **Projektinitialisierung**:

   - Erstelle eine neue Projektstruktur:
     ```bash
     mkdir auth && cd auth
     npm init -y
     ```
   - Installiere die erforderlichen Pakete:
     ```bash
     npm install typescript ts-node-dev express @types/express
     ```

4. **TypeScript-Konfiguration**:

   - Erstelle die TypeScript-Konfigurationsdatei:
     ```bash
     tsc --init
     ```

5. **Express Server für Authentifizierung**:

   - Der Authentifizierungs-Express-Server wird erstellt und mit `ts-node-dev` für die Entwicklung ausgeführt.

     ```bash
     ts-node-dev src/index.ts
     ```

## 🐳 Docker Integration

- Erstelle das Docker-Image für den Auth-Service:

  ```bash
  docker build -t mma/auth .
  ```

## ☸️ Kubernetes Deployment

- Deployment-Konfiguration für Kubernetes wurde erstellt in der Datei `auth-depl.yaml`. Diese Datei definiert das Auth-Service Deployment in Kubernetes.

## ⚓ Skaffold Setup

- [Skaffold](https://skaffold.dev/) wird für das automatische Erstellen, Pushen und Anwenden der Konfigurationen verwendet, um den Auth-Service in der Kubernetes-Umgebung zu starten.

## 🌐 NGINX Ingress Konfiguration

- Der NGINX Ingress-Controller wurde konfiguriert und in `ingress-depl.yaml` integriert, um den externen Zugriff auf den Auth-Service zu ermöglichen.

---

## 📂 Projektstruktur

```plaintext
auth/
├── Dockerfile
├── tsconfig.json
├── auth-depl.yaml
├── ingress-depl.yaml
└── src/
    └── index.ts
```

## 💡 Wichtige Technologien und Tools

- **TypeScript**: Typensichere Entwicklung
- **Express**: Web-Framework für den Auth-Service
- **Docker**: Containerisierung des Services
- **Kubernetes**: Orchestrierung von Containern
- **Skaffold**: Entwicklung und Deployment in Kubernetes
- **NGINX Ingress**: Reverse Proxy für den Zugriff auf den Service

---

### 📝 Hinweise

Stelle sicher, dass Docker und Kubernetes korrekt installiert und konfiguriert sind, bevor du das Projekt ausführst.

## 📧 Kontakt

Für Fragen oder Feedback stehe ich gerne zur Verfügung!

---

Viel Erfolg beim Arbeiten mit dem Auth-Service!
