#!/usr/bin/env bash
# Push main + deploy gh-pages. Requires push access to hiveesurf/HiveSurf.
#
# Option A — PAT (works when Keychain has the wrong GitHub user):
#   1. Log into GitHub as a user who can push to https://github.com/hiveesurf/HiveSurf
#   2. Create a token: https://github.com/settings/tokens (classic: "repo" scope,
#      or fine-grained: Repository access to HiveSurf, Contents: Read and write)
#   3. Run:
#        export HIVESURF_GH_PAT='ghp_xxxxxxxx'
#        ./scripts/push-to-github.sh
#
# Option B — Keychain (after org gives your Mac’s GitHub user write access):
#   ./scripts/push-to-github.sh
#   (uses: git push origin main)

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -n "${HIVESURF_GH_PAT:-}" ]]; then
  echo "Pushing main with HIVESURF_GH_PAT (not printed)…"
  git push "https://oauth2:${HIVESURF_GH_PAT}@github.com/hiveesurf/HiveSurf.git" HEAD:main
else
  echo "Pushing main (Keychain / saved credentials)…"
  git push origin main
fi

echo "Publishing site (gh-pages)…"
npm run deploy

echo "Done."
