export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/index.bundle.js',
    format: 'iife',
    name: 'Interactive',
    globals: {
      Interactive: ''
    }
  }
};
