module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        vows: {
            all: {
                src: ["test/*.js"]
            }
        },
        watch: {
            scripts: {
                files: ["*.js", "**/*.js"],
                tasks: ["vows"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-vows');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ["vows", "watch"]);
}