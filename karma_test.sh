#!/bin/bash

# BASE_DIR=`dirname $0` 
BASE_DIR=karma

echo ""
echo "BASE_DIR: $BASE_DIR"
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/karma.conf.js $*
