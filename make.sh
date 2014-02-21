#/bin/sh

DATE=`date`

rm webapp/js/app.js
echo "/* COMPILED WITH make.sh - DO NOT EDIT THIS FILE, see src/ directory */" > webapp/js/app.js
echo "/* $DATE  */" >> webapp/js/app.js
echo "" >> webapp/js/app.js
cat src/angular/app.js >> webapp/js/app.js
cat src/angular/controllers.js >> webapp/js/app.js
cat src/angular/directives.js >> webapp/js/app.js
cat src/angular/filters.js >> webapp/js/app.js
cat src/angular/services.js >> webapp/js/app.js
cat src/javascript/algorithms.js >> webapp/js/app.js
cat src/javascript/mindsweep.js >> webapp/js/app.js
