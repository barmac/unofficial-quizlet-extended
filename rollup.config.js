import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-only';


const edit = {
  input: 'src/edit/script.js',
  output: {
    file: 'build/edit/script.js',
    format: 'iife'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-proposal-class-properties']
    }),
    css({
      output: 'build/edit/style.css'
    })
  ],
};

export default [edit];
