export default {
  input: 'dist/Library.js',
  output: {
    file: 'dist/Library.bundle.js',
    format: 'iife',
    name: 'Library',
    globals: {
      Interactive: ''
    }
  }
};
