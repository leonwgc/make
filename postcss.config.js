module.exports = () => {
  const plugins = {
    'postcss-preset-env': {
      autoprefixer: {},
      flexbox: 'no-2009',
      stage: 3,
    },
  };

  return {
    plugins,
  };
};
