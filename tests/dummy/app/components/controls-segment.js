import Ember from 'ember';
import layout from '../templates/components/controls-segment';

export default Ember.Component.extend({
  layout,
  classNames: ['ui', 'segments'],

  date: null,
  reset: null
});
