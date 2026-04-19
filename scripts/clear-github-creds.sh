#!/usr/bin/env bash
# Erase cached GitHub HTTPS credentials from macOS Keychain (git-credential-osxkeychain).
# Run this once if Git keeps using the wrong login or an old password.

set -euo pipefail
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
echo "Cleared saved https://github.com credentials. Next git push will prompt again."
echo "Use GitHub USERNAME + PAT (not your account password)."
