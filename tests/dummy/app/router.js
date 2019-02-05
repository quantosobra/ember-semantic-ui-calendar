import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('moment-examples');
  this.route('clear-button-examples');
  this.route('range-examples');
  this.route('custom-actions-examples');
});

export default Router;
