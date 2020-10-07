#!/bin/bash

rm -rf ./lib/
rm -rf ./dist/
find source -name "*.js" -type f -delete
find source -name "*.js.map" -type f -delete