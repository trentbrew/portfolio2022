module.exports = {
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      scss: {
        prependData: "@import '@/global/_variables.scss';",
      },
    },
  },
};
