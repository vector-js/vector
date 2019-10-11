export default {
  input: 'dist/index.js',
  output: {
    file: 'vector.js',
    format: 'iife',
    name: 'Vector',
    globals: {
      Interactive: ''
    }
  }
};
