#!/usr/bin/env bash
# Simple deploy script using rsync + ssh to copy the repo to a remote server and run docker compose
# Usage: ./deploy.sh <user@host> <remote_path> <ssh_key_path>

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 user@host /remote/path [ssh_key]"
  exit 1
fi

TARGET=$1
REMOTE_PATH=$2
SSH_KEY=${3:-}

RSYNC_OPTS="-az --delete --exclude node_modules --exclude .git --exclude .env"
if [ -n "$SSH_KEY" ]; then
  SSH_CMD="ssh -i $SSH_KEY -o StrictHostKeyChecking=no"
else
  SSH_CMD="ssh -o StrictHostKeyChecking=no"
fi

echo "Syncing to $TARGET:$REMOTE_PATH"
rsync $RSYNC_OPTS -e "$SSH_CMD" . $TARGET:$REMOTE_PATH

echo "Running remote docker compose"
$SSH_CMD $TARGET "cd $REMOTE_PATH && docker compose pull || true && docker compose up -d --build"

echo "Deployment finished"
