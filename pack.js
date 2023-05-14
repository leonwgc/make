/* eslint-disable */
const { default: pack } = require('packw');
const argv = require('yargs').argv;
const path = require('path');

const isDev = !!argv.dev;

pack(isDev, {
  entry: {
    index: `./src/index`,
  },
  output: {
    path: path.resolve(__dirname, isDev ? '__dev__' : 'docs'),
    publicPath: '',
  },
});
