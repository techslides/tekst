#!/bin/bash

/*
 * Run this script from the root dir:  ./scripts/test.sh
 */

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

karma start $BASE_DIR/karma.conf.js $*
