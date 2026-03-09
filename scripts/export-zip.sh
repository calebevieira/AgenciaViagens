#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/dist"
ZIP_NAME="clinic-os-mvp.zip"
ZIP_PATH="$OUT_DIR/$ZIP_NAME"

mkdir -p "$OUT_DIR"
rm -f "$ZIP_PATH"

cd "$ROOT_DIR"
zip -r "$ZIP_PATH" . \
  -x "node_modules/*" "*/node_modules/*" \
  -x ".next/*" "*/.next/*" \
  -x "dist/*" "*/dist/*" \
  -x ".git/*" "*/.git/*"

echo "ZIP generated at: $ZIP_PATH"
