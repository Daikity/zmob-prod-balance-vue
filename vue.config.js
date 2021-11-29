module.exports = {
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
