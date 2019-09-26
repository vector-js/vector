export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/library.bundle.js',
    format: 'iife',
    name: 'Interactive',
    globals: {
      Interactive: ''
    }
  }
};
