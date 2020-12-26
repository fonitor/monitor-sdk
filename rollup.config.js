import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify';

// rollup可以帮我们打包 es6的模块化语法
export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        sourcemap: true
    },
    plugins: [
        serve({
            openPage: './index.html',
            contentBase: '',
            port: 9002
        }),
        babel({
            exclude: 'node_modules/**'
        }),
    ]
}