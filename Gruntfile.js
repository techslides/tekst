module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: ['Gruntfile.js', 'src/angular/*.js', 'src/javascript/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    }, 

    karma: {
      unit: { configFile: 'test/karma.conf.js' } 
    },

    protractor: {
      options: {
        keepAlive: true,
        configFile: 'test/protractor.conf.js',
        args: {
          seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
          chromeDriver: 'node_modules/protractor/selenium/chromedriver'
        }
      },
      run: {}
    },

    protractor_webdriver: {
      protractor: {
        options: {
          path: 'node_module/protractor/bin/',
          command: 'webdriver-manager start',
        },
      },
    },

    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  // Default task.
  grunt.registerTask('default', 'jshint');
  grunt.registerTask('e2e', ['protractor:run']);
  grunt.registerTask('unit', ['karma']);
};
