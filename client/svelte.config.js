const sveltePreprocess = require('svelte-preprocess');
const makeAttractionsImporter = require('attractions/importer.js');
const path = require('path')

module.exports = {
  preprocess: [sveltePreprocess({
    scss: {
      importer: makeAttractionsImporter({
        // specify the path to your theme file, relative to this file
        themeFile: path.join(__dirname, 'src/styles/theme.scss'),
      }),
      // not mandatory but nice to have for concise imports
      // includePaths: [path.join(__dirname, './static/css')],
    },
  })],
};
