module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            name: 'notebook',
            banner: '/* <%= meta.name %> - v<%= pkg.version %>\n' + ' * <%= pkg.homepage %>\n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */'
        },
        lint: {
            files: ['grunt.js']
        },
        concat: {
            notebook: {
                src: ['<banner:meta.banner>', "public/javascripts/brick.js", "public/javascripts/chunk.js"],
                dest: 'public/javascripts/<%= pkg.name %>.js'
            }
        },
        min: {
            notebook: {
                src: ['<banner:meta.banner>', 'public/javascripts/<%= pkg.name %>.js'],
                dest: 'public/javascripts/<%= pkg.name %>-min.js'
            }
        },
        // less: {
        //     brix: {
        //         src: ['src/style/brix.less'],
        //         dest: 'dist/<%= pkg.name %>.css'
        //     },
        //     brix_min: {
        //         src: ['src/style/brix.less'],
        //         dest: 'dist/<%= pkg.name %>-min.css',
        //         options: {
        //           yuicompress: true
        //         }
        //     }
        // },
        // brixless:{
        //     gallerysrc:{
        //         src:'src/gallery/',
        //         dest:'src/gallery/'
        //     },
        //     gallerydes:{
        //         src:'src/gallery/',
        //         dest:'dist/gallery/'
        //     },
        //     gallerydes_min:{
        //         src:'src/gallery/',
        //         dest:'dist/gallery/',
        //         options: {
        //           yuicompress: true
        //         }
        //     }
        // },
        // brixjs:{
        //     gallerysrc:{
        //         src:'src/gallery/',
        //         dest:'dist/gallery/'
        //     },
        //     gallerydes:{
        //         src:'src/gallery/',
        //         dest:'dist/gallery/',
        //         options: {
        //           compress: true
        //         }
        //     }
        // },
        // watch: {
        //     watchless:{
        //         files: 'src/gallery/**/*.less',
        //         tasks: 'brixless'
        //     },
        //     watchjs:{
        //         files: 'src/gallery/**/index.js',
        //         tasks: 'brixjs'
        //     },
        //     watchcss:{
        //         files: 'src/style/*.less',
        //         tasks: 'less'
        //     }
        // },
        // jshint: {
        //     options: {
        //         browser: true,
        //         curly: true,
        //         eqeqeq: false,
        //         immed: true,
        //         latedef: true,
        //         newcap: true,
        //         noarg: true,
        //         sub: true,
        //         undef: true,
        //         boss: true,
        //         eqnull: true
        //     },
        //     globals: {
        //         exports: true,
        //         module: false,
        //         KISSY: true,
        //         console: true,
        //         print: true,
        //         document: true,
        //         window: true
        //     }
        // },
        uglify: {
            codegen: {
                ascii_only: true
            }
        }
    });

    //npm install grunt-less
    //grunt.loadNpmTasks('grunt-less');

    //tasks
    //grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', 'lint concat min');
};
