module.exports = grunt => {
    grunt.initConfig({
        uglify: {
            my_target: {
                options: {
                    sourceMap: false,
                    mangle: false,
                },
                files: {
                    "dist/appWASM.js" : ["dist/appWASM.js"]
                }
            }
        },

        exec: {
            build: "~/Projects/emsdk/emsdk_env.sh & echo Building... & emcc -o ./dist/appWASM.js ./dev/cpp/emscripten.cpp -O3 -s ALLOW_MEMORY_GROWTH=1 -s USE_WEBGL2=1 -s WASM=1 -s NO_EXIT_RUNTIME=1 -std=c++1z -s \"EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap', 'stringToUTF8']\""
        },

        watch: {
            cpp: {
                files: ["dev/cpp/*.cpp", "dev/cpp/*.h"],
                tasks: ["exec:build"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-exec");

    grunt.registerTask("default", ["exec:build", "watch"]);
};
