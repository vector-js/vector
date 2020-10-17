#!/bin/bash

rm -rf ./lib/
rm -rf ./dist/
find src -name "*.js" -type f -delete
find src -name "*.js.map" -type f -delete