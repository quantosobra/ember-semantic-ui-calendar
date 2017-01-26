/* jshint node:true */
var publishToGhPages = require('ember-addon-genie/lib/tasks/publish-to-gh-pages');
// var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  afterPush: publishToGhPages,
  publish: true
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  // message: "Bumped version to %@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',
  //
  // beforeCommit: function(project, versions) {
  //   return new RSVP.Promise(function(resolve, reject) {
  //     // Do custom things here...
  //   });
  // }
};
