// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

// "cjs" CommonJS Bundle: suitable for node
// "esm" ES Module Bundle: suitable for other libs and apps
// "umd" Suitible for any browser

export default [
	// browser-friendly UMD build
	{
		input: 'source/index.ts',
		output: {
			name: 'Vector',
			file: pkg.browser,
			format: 'es'
		},
		plugins: [
			// resolve(),
			// commonjs(),
			typescript()
		]
	},

	{
		input: 'source/index.ts',
    plugins: [
      typescript()
    ],
		output: [
			{ file: pkg.module, format: 'esm' }
		]
	}
];