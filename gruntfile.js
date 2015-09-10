module.exports = function(grunt) {
    grunt.initConfig({
        path: {
            sass: 'dev/sass',
            distcss: 'www/css',
            distjs: 'www/js',
            js: 'dev/js'
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: ['gruntfile.js', '<%=path.js%>/**/*.js']
        },
        concat: {
            options: {
                sourceMap: true,
                expand: true
            },
            js: {
                src: ['<%=path.js%>/**/*.js', '!<%=path.js%>/concat/script.js'],
                dest: '<%=path.js%>/concat/script.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                modules: 'common',
                stage: 0
            },
            dist: {
                files: {
                    'www/js/app.js': '<%=path.js%>/concat/script.js'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    '<%=path.distcss%>/style.css': '<%=path.sass%>/**/*.scss'
                }
            }
        },
        watch: {
            dev: {
                files: ['<%=path.js%>/**/*.js', '<%=path.sass%>/**/*.scss'],
                tasks: ['babel', 'sass'],
                options: {
                    spawn: false
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['eslint', 'sass', 'concat', 'babel']);
    grunt.registerTask('dev', ['eslint', 'watch:dev']);

};
