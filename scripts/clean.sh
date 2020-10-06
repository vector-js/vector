#!/bin/bash

rm -rf ./dist/
rm -rf ./docs/
find source -name "*.js" -type f -delete
find source -name "*.js.map" -type f -delete