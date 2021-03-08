import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

// rollup可以帮我们打包 es6的模块化语法
export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        sourcemap: true // // es6->es5 开启源码调试
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
        terser()
    ],
}