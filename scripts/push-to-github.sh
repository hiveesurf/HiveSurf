#!/usr/bin/env bash
# Push main + deploy gh-pages for hiveesurf/HiveSurf.
#
# GitHub does NOT accept your GitHub "website password" for git push.
# You MUST use a Personal Access Token (PAT) — see:
#   https://github.com/settings/tokens
#
# Classic token: enable scope "repo"
# Fine-grained: repository HiveSurf → Contents: Read and write (+ Metadata read)
# If the org uses SSO: open the token on GitHub → "Configure SSO" / Authorize for hiveesurf.
#
# Then run (pick ONE env var name):
#   export HIVESURF_GH_PAT='ghp_xxxx'   # or github_pat_xxxx for fine-grained
#   ./scripts/push-to-github.sh
#
# Optional: GITHUB_TOKEN or GH_TOKEN are also accepted.

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

TOKEN="${HIVESURF_GH_PAT:-${GITHUB_TOKEN:-${GH_TOKEN:-}}}"

if [[ -z "$TOKEN" ]]; then
  echo ""
  echo "No PAT in environment. Set one of:"
  echo "  export HIVESURF_GH_PAT='your_token'"
  echo "  export GITHUB_TOKEN='your_token'"
  echo ""
  echo "Then run:  $0"
  echo ""
  echo "Clear bad saved passwords (macOS Keychain), then try interactive push:"
  echo "  ./scripts/clear-github-creds.sh"
  echo "  git push origin main"
  echo "  → Username: your GitHub USERNAME (not email)"
  echo "  → Password: paste PAT (not your GitHub login password)"
  echo ""
  exit 1
fi

echo "Pushing main (token from env; value not printed)…"
if ! git push "https://oauth2:${TOKEN}@github.com/hiveesurf/HiveSurf.git" HEAD:main; then
  echo ""
  echo "Push failed. Common causes:"
  echo "  • Token is your GitHub password (invalid) — create a PAT at github.com/settings/tokens"
  echo "  • Token owner cannot push hiveesurf/HiveSurf — need repo write / org access"
  echo "  • Fine-grained token missing Contents: write, or SSO not authorized for org"
  echo ""
  exit 1
fi

echo "Publishing site (gh-pages)…"
npm run deploy

echo "Done."
