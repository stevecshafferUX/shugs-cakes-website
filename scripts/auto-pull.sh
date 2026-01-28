#!/bin/bash

# Auto-pull script - Checks for remote changes every 30 seconds
# Usage: ./scripts/auto-pull.sh

REPO_DIR="/Users/steve/Desktop/Projects/Shugs/shugs-cakes-website"
BRANCH="main"
CHECK_INTERVAL=30  # seconds

cd "$REPO_DIR" || exit 1

echo "🔄 Auto-pull started for $BRANCH branch"
echo "Checking for updates every ${CHECK_INTERVAL} seconds..."
echo "Press Ctrl+C to stop"
echo ""

while true; do
  # Fetch remote changes
  git fetch origin "$BRANCH" --quiet 2>/dev/null

  # Check if local is behind remote
  LOCAL=$(git rev-parse @)
  REMOTE=$(git rev-parse @{u})

  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "📥 $(date '+%Y-%m-%d %H:%M:%S') - New changes detected, pulling..."

    # Pull changes
    git pull origin "$BRANCH" --quiet

    if [ $? -eq 0 ]; then
      echo "✅ Successfully pulled latest changes"

      # Show what changed
      echo ""
      echo "Recent commits:"
      git log --oneline -3
      echo ""
    else
      echo "❌ Pull failed - you may have local changes"
      echo "Run 'git status' to check"
      echo ""
    fi
  else
    echo "⏱️  $(date '+%Y-%m-%d %H:%M:%S') - Up to date"
  fi

  sleep $CHECK_INTERVAL
done
