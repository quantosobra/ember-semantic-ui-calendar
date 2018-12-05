'use strict';

const path = require('path');
const merge = require('lodash.merge');

let defaults = {
  import: {
    css: true,
    javascript: true
  },
  source: {
    css: 'node_modules/semantic-ui-calendar/dist',
    javascript: 'node_modules/semantic-ui-calendar/dist'
  }
};

module.exports = {
  name: require('./package').name,

  included: function (app) {
    let options = merge({}, defaults, app.options['ember-semantic-ui-calendar']);

    if (options.import.css) {
      app.import({
        development: path.join(options.source.css, 'calendar.css'),
        production: path.join(options.source.css, 'calendar.min.css')
      });

      app.import({
        development: 'vendor/ember-semantic-ui-calendar.css',
        production: 'vendor/ember-semantic-ui-calendar.min.css'
      });
    }

    if (options.import.javascript) {
      app.import({
        development: path.join(options.source.javascript, 'calendar.js'),
        production: path.join(options.source.javascript, 'calendar.min.js')
      });
    }
  }
};
