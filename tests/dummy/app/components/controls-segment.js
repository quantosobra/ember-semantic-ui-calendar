import Component from '@ember/component';
import layout from '../templates/components/controls-segment';

export default Component.extend({
  layout,
  classNames: ['ui', 'segments'],

  date: null,
  reset: null
});
