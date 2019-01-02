const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup')
const version = process.env.VERSION || require('../package.json').version

const devConf = {
	inputOptions: {
		input: 'lib/index.js',
		plugins: [
			replace({
				[`process.env.NODE_ENV`]: `'${process.env.NODE_ENV}'`,
				__VERSION__: version,
			}),
			nodeResolve(),
			commonjs(),
			serve({
				contentBase: './example/',
				port: 8789,
				open: true,
				historyApiFallback: true,
			}),
			livereload({
				watch: './example/bundle.js'
			})
		],
	},
	outputOptions: {
		name: 'Rein',
		file: './example/bundle.js',
		format: 'iife',
	},
}
module.exports = devConf
