'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const path = require('path');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
    snippetSearchPaths: ['tests/dummy/app']
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const semanticFontsSource = 'node_modules/semantic-ui-css/themes/default/assets/fonts';
  const semanticFontsDestination = 'assets/themes/default/assets/fonts';
  const fontExtensions = ['.eot', '.svg', '.ttf', '.woff', '.woff2'];
  for (let ext of fontExtensions) {
    app.import(path.join(semanticFontsSource, 'brand-icons' + ext), { destDir: semanticFontsDestination });
    app.import(path.join(semanticFontsSource, 'outline-icons' + ext), { destDir: semanticFontsDestination });
  }

  return app.toTree();
};
