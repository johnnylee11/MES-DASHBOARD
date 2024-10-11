const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/], // This allows ts-loader to handle .vue files
          },
        },
      ],
    },
  },
  // Adding proxy configuration for devServer
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server running on localhost:3000
        changeOrigin: true,
      },
    },
  },
});
