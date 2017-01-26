/*jshint node:true*/
module.exports = {
  description: 'Install Semantic UI Calendar',

  normalizeEntityName: function() {},

  afterInstall: function () {
    return this.addBowerPackageToProject('semantic-ui-calendar');
  }
};
