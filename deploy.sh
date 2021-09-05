#!/bin/bash

# Must run this in root level

# Run Linter
echo "🧹 Linting UI..."
npm run lint
if [ $? -eq 0 ]; then

  # Build UI
  echo "🔨 Building UI..."
  npm run build
  if [ $? -eq 0 ]; then

    # 200.html allows for router to work properly with surge
    echo "📝 Creating 200.html..."
    cd ./dist
    cat index.html > 200.html

    # Deploying to surge host (must be logged in w proper credentials beforehand)
    echo "🚀 Deploying to surge..."
    surge ./ thepokedex.surge.sh

  else
    echo "❌ Building failed"
  fi
else
  echo "❌ Linting failed"
fi

