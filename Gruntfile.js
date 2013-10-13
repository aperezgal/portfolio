module.exports = function(grunt) {

    var BUILD = "./target/aperezgal-build/",
        WEB_APP = "./html/",
        JS = WEB_APP + "js/";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        node_tap: {
            default_options: {
                options: {
                    outputType: 'tap', // tap, failures, stats
                    outputTo: 'console' // or file
                    //outputFilePath: 'tap.log' // path for output file, only makes sense with outputTo 'file'
                },
                files: {
                    'tests': ['./test/*.js']
                }
            },
            jenkins: {
                options: {
                    outputType: 'tap', // tap, failures, stats
                    outputTo: 'file', // or file
                    outputFilePath: 'tap.log' // path for output file, only makes sense with outputTo 'file'
                },
                files: {
                    'tests': ['test/*.js']
                }
            }

        },
        uglify: {
            options: {
                mangle: false
            },
            landing: {
                files: {
                    './target/aperezgal-build/js/aperezgal-min.js': [
                        JS + 'vendor/modernizr-2.6.2.min.js',
                        JS + 'vendor/jquery-1.9.1.min.js',
                        JS + 'jquery.parallax.min.js',
                        JS + 'jquery.localscroll-1.2.7-min.js',
                        JS + 'jquery.scrollTo-1.4.3.1-min.js',
                        JS + 'jquery.alerts.js',
                        JS + 'underscore.js',
                        JS + 'backbone.js',
                        JS + 'plugins.js',
                        JS + 'jquery.sequence-min.js',
                        JS + 'utils.js',
                        JS + 'views/header.js',
                        JS + 'views/footer.js',
                        JS + 'views/home.js',
                        JS + 'views/whatIsIt.js',
                        JS + 'views/howItWorks.js',
                        JS + 'views/patient.js',
                        JS + 'views/expert.js',
                        JS + 'views/whoIs.js',
                        JS + 'main.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: WEB_APP,
                    src: [
                        "img/**",
                        "templates/**",
                        "fonts/**",
                        "404.html",
                        "crossdomain.xml",
                        "favicon.ico",
                        "humans.txt",
                        "robots.txt",
                        "index.html"
                    ],
                    dest: BUILD
                }]
            }
        },
        'useminPrepare': {
            html: WEB_APP + 'index.html'
        },
        usemin: {
            html: [BUILD + 'index.html']
        },
        cssmin: {
            compress: {
                files: {
                    './target/aperezgal-build/css/styles-min.css': [WEB_APP + 'css/*.css']
                }
            }
        },
        clean: {
            build: [BUILD]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-usemin");
    grunt.loadNpmTasks('grunt-node-tap');
    // Default task(s).
    grunt.registerTask('default', ['uglify:aperezgal', 'copy', 'cssmin', 'usemin']);
    grunt.registerTask("test", ["node_tap:default_options"]);
};
