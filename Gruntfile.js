// borrowed from https://raw.githubusercontent.com/ozasadnyy/optimized-jekyll-grunt/master/Gruntfile.js

'use strict';

module.exports = function(grunt) {
    // Show elapsed time after tasks run
    require('time-grunt')(grunt);
    // Load all Grunt tasks
    require('jit-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // shell commands for use in Grunt tasks
        shell: {
            jekyllServe: {
//                command: 'bundle exec jekyll s -c _config.yml,_localhost.yml -o -- --no-lunr-index'
                command: 'bundle exec jekyll s -c _config.yml,_localhost.yml -o'
            },
            jekyllBuild: {
                command: 'bundle exec jekyll b -c _config.yml'
            }
        },
        app: {
            source: '.',
            dist: '_site'
        },
        clean: {
            server: [
                '.jekyll',
                '.tmp'
            ],
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/*',
                        '!<%= app.dist %>/.git*'
                    ]
                }]
            }
        },
        uglify: {
            server: {
                options: {
                    mangle: false,
                    beautify: true
                },
                files: {
                    '<%= app.source %>/assets/js/search.min.js': ['<%= app.source %>/assets/js/lunr/*.js']
                }
            },
            dist: {
                options: {
                    compress: true,
                    preserveComments: false,
                    report: 'min'
                },
                files: {
                    // 'dest/output.min.js': ['src/input1.js', 'src/input2.js']
                    '<%= app.source %>/assets/js/scripts.min.js': ['<%= app.source %>/assets/js/lunr/*.js']
                }
            }
        }
    });

    // Define Tasks
    grunt.registerTask('serve', [
        'clean:server',
        'uglify:dist'
//        'shell:jekyllServe'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'shell:jekyllBuild',
        'uglify:dist'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};