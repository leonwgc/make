import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import legacy from '@vitejs/plugin-legacy';

const customConfig = {
  publicPath: '/', // 打包生产环境时使用
  theme: '#004bcc', // antd 主题色
  supportLegacyBrowsers: false, //是否支持老的的浏览器，e.g. IE ，设置true生产打包时minify使用 terser, 否则使用更快的esbuild (包体积也稍大)
};

const modifyVars = {
  '@primary-color': customConfig.theme,
  '@link-color': customConfig.theme,
};

export default ({ command, mode }) => {
  /**
   * @type {import('vite').UserConfig}
   */
  const config = {
    css: {
      preprocessorOptions: {
        less: {
          relativeUrls: false,
          javascriptEnabled: true,
          modifyVars,
        },
      },
    },
    define: {
      __client__: true,
      __dev__: true,
    },
    plugins: [
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            },
          },
          {
            libraryName: 'zarm',
            esModule: true,
            resolveStyle: (name) => {
              return `zarm/es/${name}/style/css`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    logLevel: 'info',
  };

  if (command === 'serve') {
    config.plugins.unshift(reactRefresh());
    config.server = {
      port: 9004,
    };
  } else {
    config.base = customConfig.publicPath;
    if (customConfig.supportLegacyBrowsers) {
      config.plugins.push(legacy());
    }

    config.build = {
      outDir: `dist`,
      assetsDir: '',
      emptyOutDir: true,
      assetsInlineLimit: 10240,
      manifest: true,
      minify: customConfig.supportLegacyBrowsers ? 'terser' : 'esbuild',
    };
  }

  return config;
};
