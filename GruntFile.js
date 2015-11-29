/**
 * Created by steve on 29/11/2015.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            options: {
                browserifyOptions: {
                    debug : true,
                    paths: ['node_modules', 'src/js']
                }
            },
            core: {
                files: [
                    {
                        src : ['src/js/index.js'],
                        dest : 'build/main.js'
                    }
                ]
            }
        },
        copy: {
            main: {
                src: 'src/index.html',
                dest: 'tmp/index.html'
            }
        },
        concat: {
            options: {
                separator: ''
            },
            templates: {
                src: ['src/templates/**'],
                dest: 'tmp/templates.html'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive : true,
                    base: ''
                }
            }
        },
        insert: {
            options: {},
            templates: {
                src: "tmp/templates.html",
                dest: "tmp/index.html",
                match: "<!-- templates added here -->"
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes : true
                },
                files: {
                    'index.html': 'tmp/index.html'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/main.min.js': ['build/main.js']
                }
            }
        },
        watch: {
            templates : {
                files : ['src/templates/**'],
                tasks : ['concat:templates', 'copy', 'insert:templates', 'htmlmin'],
                options: {
                    interrupt : true,
                    spawn: false
                }
            },
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['browserify'],
                options: {
                    interrupt : true,
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('build', ['browserify', 'concat', 'copy', 'insert', 'htmlmin', 'uglify']);
    grunt.registerTask('testServer', ['connect:server']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-insert');

};