#!/usr/bin/env bash

rm ./dist/getting-started.tgz
rm -rf ./dist/getting-started

tar --exclude=\"*.js.map\" -czvf ./dist/getting-started.tgz ./dist/ ./css/ -C getting-started .
