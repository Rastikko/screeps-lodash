module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
      copy: {
          files: {
            cwd: 'src',
            src: '**/*',
            dest: 'dist',
            expand: true,
            filter: 'isFile',
            rename: function(dest, src) {
              if (src === 'main.js') {
                return dest + '/' + src;
              }
              var folder = src.substring(0, src.indexOf('/'));
              var file = src.substring(src.indexOf('/') + 1, src.length);
              return dest + '/' + folder + "-" + file;
            }
          }
        },
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
