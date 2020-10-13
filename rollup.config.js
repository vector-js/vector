import typescript from 'rollup-plugin-typescript';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

// "cjs" CommonJS Bundle: suitable for node
// "esm" ES Module Bundle: suitable for other libs and apps
// "umd" Suitible for any browser

// process.env.NODE_ENV = 'esm';

export default [
	{
		input: 'source/index.ts',
		output: {
			file: "dist/vector.mjs",
			format: 'es'
		},
		plugins: [
			typescript(),
			babel({babelHelpers: 'runtime'}),
		],
	}
];