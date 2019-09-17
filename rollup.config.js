export default {
  input: 'dist/Interactive.js',
  output: {
    file: 'dist/library.bundle.js',
    format: 'iife',
    name: 'Interactive',
    globals: {
      Interactive: ''
    }
  }
};
