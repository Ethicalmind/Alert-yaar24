#!/bin/bash
# Deploy helper: run this from the project root to initialize git and push to GitHub
# Usage: make the file executable: chmod +x deploy.sh
# then: ./deploy.sh

if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh https://github.com/<your-username>/<repo-name>.git"
  exit 1
fi

REPO_URL="$1"

# initialize and push
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit - OpenCampus"
  git branch -M main
  git remote add origin "$REPO_URL"
  git push -u origin main
  echo "Pushed to $REPO_URL"
else
  echo ".git already exists. Skipping init. To push run: git add . && git commit -m \"update\" && git push"
fi

echo "\nNext steps:"
echo "- On GitHub: open repository Settings → Pages and set Source to 'main' branch and '/' (root)."
echo "- For Netlify: zip the project folder and drag & drop to Netlify Sites or connect the GitHub repo for continuous deploy."

echo "Remember: replace the maps API key in index .html or use .env and do not commit secret keys."
