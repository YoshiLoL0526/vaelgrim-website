#!/usr/bin/env bash
# Builds the site and packages dist/ into a zip ready to upload to Hostinger.
#
# The zip holds the *contents* of dist/ at its root (hidden files such as
# .htaccess included), so it can be extracted straight into public_html.
#
# Usage:
#   bash scripts/package-hostinger.sh [output.zip]
#
# The zip is created with the first tool that works, in this order:
#   zip (Linux/macOS), PowerShell's .NET zip writer (Windows),
#   Windows' tar.exe / macOS bsdtar (--format zip).

set -euo pipefail

# Work from the repository root, wherever the script is called from.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

OUT="${1:-vaelgrim-hostinger.zip}"

echo "==> Building the site (npm run build)"
npm run build

if [ ! -f dist/index.html ]; then
  echo "error: dist/index.html is missing; the build did not finish." >&2
  exit 1
fi

# Runs the given command to create $OUT and checks that a real zip appeared
# (every zip starts with the bytes "PK"); discards anything else.
try_zip() {
  rm -f "$OUT"
  "$@" || return 1
  if [ -f "$OUT" ] && [ "$(head -c 2 "$OUT" 2>/dev/null)" = 'PK' ]; then
    return 0
  fi
  rm -f "$OUT"
  return 1
}

zip_in_dist() {
  (cd dist && zip -qr "../$OUT" .)
}

echo "==> Packaging dist/ into $OUT"

tool=""
if command -v zip >/dev/null 2>&1 && try_zip zip_in_dist; then
  # zip writes forward-slash paths and includes dotfiles.
  tool="zip"
elif command -v powershell.exe >/dev/null 2>&1 &&
  try_zip powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "
    \$ErrorActionPreference = 'Stop'
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    \$src = (Resolve-Path 'dist').Path
    \$dst = Join-Path (Get-Location) '$OUT'
    \$zip = [System.IO.Compression.ZipFile]::Open(\$dst, 'Create')
    Get-ChildItem -Recurse -Force -File \$src | ForEach-Object {
      \$rel = \$_.FullName.Substring(\$src.Length + 1).Replace('\\', '/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(\$zip, \$_.FullName, \$rel, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
    \$zip.Dispose()
  "; then
  # Windows: .NET writes a clean zip with forward slashes, no ./ prefix.
  tool="powershell/.NET"
elif command -v tar.exe >/dev/null 2>&1 &&
  try_zip tar.exe --format zip -c -f "$OUT" -C dist .; then
  # Windows' built-in bsdtar needs the format forced (its -a ignores .zip).
  tool="tar.exe"
elif tar --version 2>/dev/null | grep -q bsdtar &&
  try_zip tar --format zip -c -f "$OUT" -C dist .; then
  # macOS bsdtar.
  tool="bsdtar"
fi

if [ -z "$tool" ]; then
  echo "error: no tool found that can create a zip." >&2
  echo "       Install 'zip' (Linux) or run this from Git Bash on Windows." >&2
  exit 1
fi

size=$(du -h "$OUT" | cut -f1)
echo "==> Done ($tool): $OUT ($size)"
echo "    Upload it to public_html/ in Hostinger and extract it there."
