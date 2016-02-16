module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'xxx',
                password: 'xxx',
                branch: 'simulation',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        }
    });
}
