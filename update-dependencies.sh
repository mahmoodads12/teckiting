#!/bin/bash

# Hauptverzeichnis mit allen Services
BASE_DIR="./services"

# Gehe durch jedes Verzeichnis im Hauptverzeichnis
for dir in "$BASE_DIR"/*; do
  if [ -d "$dir" ]; then
    echo "Aktualisiere @types/express in $dir"
    cd "$dir"
    npm install @types/express@latest
    cd - > /dev/null
  fi
done

echo "Alle Abhängigkeiten wurden aktualisiert."
