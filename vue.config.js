module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
  publicPath: "/sap/bc/bsp/sap/zmob004_cpi_vue/",
  lintOnSave: true,
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
  devServer: {
    proxy: {
      "^/": {
        target:
          "https://srvsap83.rainvest.local:44300/sap/opu/odata/sap/ZMOB004_CPI_SRV/",
        changeOrigin: true,
      },
    },
  },
};
