export default {
  input: 'dist/interactive.js',
  output: {
    file: 'dist/library.bundle.js',
    format: 'iife',
    name: 'Interactive',
    globals: {
      Interactive: ''
    }
  }
};
