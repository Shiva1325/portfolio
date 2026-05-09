#!/bin/bash
# Run this after downloading a new resume PDF from Overleaf.
# Usage: ./scripts/update-resume.sh ~/Downloads/Shiva_Sai_Kumar_Patibandla_Resume.pdf

set -e

PDF=${1:-"$HOME/Downloads/Shiva_Sai_Kumar_Patibandla_Resume.pdf"}

if [ ! -f "$PDF" ]; then
  echo "Error: PDF not found at $PDF"
  echo "Download it from Overleaf first: https://www.overleaf.com/read/pfjrmdcnrqtm"
  exit 1
fi

cp "$PDF" "$(dirname "$0")/../public/resume.pdf"
echo "✓ Resume updated at public/resume.pdf"

echo "Building and deploying..."
npm run deploy
echo "✓ Deployed — resume is live"
