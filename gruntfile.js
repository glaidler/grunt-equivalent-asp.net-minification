/// <vs BeforeBuild='default' />
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            options: { separator : ';\n' },
            prod: {
                cssDest: 'build/bower.css',
                dest: 'build/bower.js',
                dependencies: {
                    'angular-shema-form': ['angular', 'angular-sanitize', 'tv4', 'objectpath', 'bootstrap'],
                    'Leaflet.awesome-markers': ['leaflet'],
                    'angular': ['jquery']
                },
                mainFiles: {
                    'ace-builds': ['src/ace.js', 'src/mode-json.js', 'src/theme-chrome.js'],
                    'angular-hovercard':['dist/angular-hovercard.js','dist/angular-hovercard.css']
                },
                exclude:['angular-mocks'],
                bowerOptions: {
                    relative: false
                }
            }

        },
        concat: {
            options: {
                separator: ';',
            },
            prod: {
                files: {
                    'build/app.js': [ 'App/commonServices.js','App/harbourApp.js', 'App/serverConfig.js'],
                    'build/directives.js': ['App/directives/*.js'],
                    'build/controllers.js': ['App/controllers/**/*.js', 'App/controllers/*.js'],
                    'build/services.js': [
                        'App/services/**/*.js', 'App/services/*.js', 'App/services/common/**/*.js', 'App/services/common/*.js'
                    ]
                },
            }

        },
        injector: {
            options: {
                // Task-specific options go here.

            },
            dev: {
                files: {
                    'Views/Shared/_layout.cshtml': ['bower.json', 'bower_components/angular-hovercard/dist/angular-hovercard.js', 'Content/hovercard.css', 'Content/site.css', 'Content/icomoon.css', 'Content/light-theme.css', 'Content/theme-colors.css', 'App/*.js', 'App/directives/*.js', 'App/controller/*.js', 'App/controllers/**/*.js', 'App/services/**/*.js', 'App/services/*.js', 'App/services/common/**/*.js', 'App/services/common/*.js'],
                }
            },
            prod: {
                files: {
                    'Views/Shared/_layout.cshtml': ['build/bower.min.js',
                        'build/app.min.js', 'build/directives.min.js',
                        'build/controllers.min.js', 'build/services.min.js',
                        'build/bower.min.css','build/app.min.css' ],
                }
            },
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            prod: {
                files: {
                    'build/app.js': ['build/app.js'],
                    'build/directives.js': ['build/directives.js'],
                    'build/controllers.js': ['build/controllers.js'],
                    'build/services.js': ['build/services.js']
                },
            }
        },
        uglify: {
            prod: {
                mangle: false,
                files: {
                    'build/app.min.js': ['build/app.js'],
                    'build/bower.min.js': ['build/bower.js'],
                    'build/directives.min.js': ['build/directives.js'],
                    'build/controllers.min.js': ['build/controllers.js'],
                    'build/services.min.js': ['build/services.js']

                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/app.min.css': ['Content/hovercard.css', 'Content/site.css', 'Content/icomoon.css', 'Content/light-theme.css', 'Content/theme-colors.css'],
                    'build/bower.min.css': ['build/bower.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-injector');
    grunt.registerTask('dev', ['bower_concat:prod', 'cssmin:target','injector:dev']);
    grunt.registerTask('prod', ['concat:prod', 'ngAnnotate:prod', 'uglify:prod', 'bower_concat:prod', 'cssmin:target', 'injector:prod']);
};
