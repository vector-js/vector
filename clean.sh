#!/bin/sh

# removes the files from the public directory, but keeps the .git information
shopt -s extglob
rm -rf ./dist/
rm -rf ./docs/
