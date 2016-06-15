module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'XXX',
                password: 'XXX',
                branch: 'simulation',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
