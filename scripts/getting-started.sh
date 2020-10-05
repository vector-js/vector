#!/usr/bin/env bash

# remove old getting started
rm ./dist/getting-started.tgz
rm -rf ./dist/getting-started

# package current gettng started
tar --exclude=\"*.js.map\" -czvf ./dist/getting-started.tgz -C ./resources/getting-started .
