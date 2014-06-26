module.exports = function(grunt) {
  grunt.initConfig({
    appName: 'tekst',
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

    concat: {
      options: { separator: ';' },
      alpha: {
        dest: 'build/_alpha.js', 
        src: [
          'src/angular/app.js',
          'src/angular/ctrl_alpha.js',
          'src/angular/ctrl_beta.js',
          'src/angular/ctrl_delta.js',
          'src/angular/ctrl_seq.js',
          'src/angular/ctrl_gamma.js',
          'src/angular/ctrl_zeta.js',
        ]
      }, 
      beta: {
        dest: 'webapp/js/app.js', 
        src: [
          'build/_alpha.js',
          'src/angular/ctrl_infography.js',
          'src/angular/directives.js',
          'src/angular/filters.js',
          'src/angular/services.js',
          'src/javascript/algorithms.js',
          'src/javascript/mindsweep.js',
        ]
       }
    }, 

    uglify: {
      options: {
        sourceMap: true,
        mangle: false,
        beautify: true,
        sourceMapName: function (filePath) {
          return filePath + '.map';
        }
      },
      layout: {
        files: {
          'webapp/js/app.js': [
            'src/angular/app.js',
            'src/angular/ctrl_alpha.js',
            'src/angular/ctrl_beta.js',
            'src/angular/ctrl_delta.js',
            'src/angular/ctrl_seq.js',
            'src/angular/ctrl_gamma.js',
            'src/angular/ctrl_zeta.js',
            'src/angular/ctrl_infography.js',
            'src/angular/directives.js',
            'src/angular/filters.js',
            'src/angular/services.js',
            'src/javascript/algorithms.js',
            'src/javascript/mindsweep.js',
            'src/javascript/Work.js'
          ]
        }
      }
    },

    go: {
      myapp: {
        root: 'webapp', 
        output: '<%= appName %>',
        run_files: ['app.go']
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

    shell: {
      gotest: {
        command: [
          'go test ./...',
          'echo "hello"'
        ].join('&&')
      },
      run: {
        command: [
          './tekst',
          'echo "tekst app is running on localhost:8000"'
        ].join('&&'),  
        options: {
          execOptions: {
            cwd: 'webapp'
          }
        }
      }
    },

    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint', 'karma']
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-go');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell');
  // Default task.
  grunt.registerTask('default', ['goapp','unit']);
  grunt.registerTask('e2e', ['protractor:run']);
  grunt.registerTask('unit', ['karma']);
  grunt.registerTask('appjs', ['concat:alpha', 'concat:beta']);
  grunt.registerTask('goapp', ['appjs','shell:gotest', 'go:build:myapp', 'shell:run']);
};
