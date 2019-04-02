/**
 * guardian.config.js
 *
 * 以下注释均为集成在 guardian 中的默认配置
 */

module.exports = {
    // jest part
    jestConfig: {
        /* 默认由脚手架自动检测。若您在这里指定则会直接使用您指定的 enzyme-adapter */
        // enzymeAdapter: 'enzyme-adapter-react-16',
        /* 默认收集覆盖率 */
        // collectCoverage: true,
        // coverageReporters: ['lcov'],
        // coverageThreshold: {
        //     global: {
        //         branches: 80,
        //         functions: 80,
        //         lines: 80,
        //         statements: 80
        //     }
        // },
        /* 默认检测 jsx? 后缀文件名 */
        // moduleFileExtensions: ['js', 'jsx'],
        /* 默认基于 jsdom 。node 环境可以指定为 'node' */
        // testEnvironment: 'jsdom',
        /* 默认已在脚手架集成了 babel-jest ，您也可以覆盖这个选项选择自己的 transformer */
        // transform: JSON.stringify({
        //     '^.+\\.jsx?$': require.resolve('./transform/babel-transformer.js')
        // }),
        /* 默认的测试用例检测路径 */
        // testMatch: ['**/__tests?__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
        /* 用例执行之前的安装文件 */
        // setupFilesAfterEnv: [
        //     require.resolve('./setup/index.js')
        // ],
        /* mock 静态资源 */
        // moduleNameMapper: JSON.stringify({
        //     '\\.(css|less|scss|sass)$': require.resolve('identity-obj-proxy'),
        //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
        //         './fileMock.js'
        //     )
        // })
    },
    /* 执行 guardian run ，默认会设置环境变量： process.env.NODE_ENV = 'test' ，但您也可以指定这个字段名 */
    // NODE_ENV: 'test'
};
