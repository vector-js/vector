#!/bin/bash
# This script deploys changes to the live site.
# https://gohugo.io/hosting-and-deployment/hosting-on-github/
# Kurt Bruns
# January 29, 2019

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo -d "../docs"

# Go To Public folder
cd public

# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push deploy master
