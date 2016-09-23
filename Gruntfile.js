module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            options: {
                banner: "/*"+
                        " * Converse.js (Web-based XMPP instant messaging client) \n"+
                        " * http://conversejs.org \n"+
                        " * Copyright (c) 2012, Jan-Carel Brand <jc@opkode.com> \n"+
                        " * Dual licensed under the MIT and GPL Licenses \n"+
                        " */"
            },
            minify: {
                dest: 'css/converse.min.css',
                src: ['css/converse.css']
            }
        },
        json: {
            main: {
                options: {
                    namespace: 'locales',
                    includePath: true,
                    processName: function(filename) {
                        return filename.toLowerCase().match(/^locale\/(.*)\/lc_messages/)[1];
                    }
                },
                src: ['locale/**/LC_MESSAGES/*.json'],
                dest: 'dist/locales.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-json');
};
