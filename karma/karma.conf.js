basePath = '../';   // up to the tekst root directory 

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'webapp/lib/angular/angular.js',
  'webapp/lib/angular/angular-*.js',
  'src/javascript/algorithms.js',
  'test/lib/angular/angular-mocks.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
