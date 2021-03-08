import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser' // 压缩代码 支持 es6
// import { uglify } from 'rollup-plugin-uglify' // 压缩代码 只支持es5 
// rollup-plugin-json 允许 Rollup 从 JSON 文件中导入数据
// import resolve from '@rollup/plugin-node-resolve' 编写的源码与依赖的第三方库进行合并
// @rollup/plugin-commonjs 将CommonJS模块转换为 ES2015
// import clear from 'rollup-plugin-clear' 插件在每次编译前先清空目标代码文件夹

// rollup可以帮我们打包 es6的模块化语法
export default {
    input: './src/index.js',
    output: {
        file: './lib/index.js',
        sourcemap: true // // es6->es5 开启源码调试
    },
    plugins: [
        // clear({
        //     targets: ['lib']
        // }),
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