#/bin/sh

rm webapp/js/app.js
cat src/angular/app.js > webapp/js/app.js
cat src/javascript/algorithms.js >> webapp/js/app.js
cat src/javascript/mindsweep.js >> webapp/js/app.js
