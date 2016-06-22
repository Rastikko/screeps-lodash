module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'xxx',
                password: 'xxx',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
