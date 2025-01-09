#!/bin/bash

# Hauptverzeichnis mit allen Services
BASE_DIR="./services"

# Zielversion
TARGET_VERSION="@matickets12/common@1.0.21"

# Durchlaufe alle Unterverzeichnisse
for dir in "$BASE_DIR"/*; do
  if [ -d "$dir" ]; then
    echo "Aktualisiere $TARGET_VERSION in $dir"
    cd "$dir"
    npm install "$TARGET_VERSION"
    cd - > /dev/null
  fi
done

echo "Alle Services wurden auf $TARGET_VERSION aktualisiert."
