import Ember from 'ember';
import Base from 'semantic-ui-ember/mixins/base';
import layout from '../templates/components/ui-calendar';

const { Component } = Ember;

/**
 * @class UiCalendar
 * @extends Ember.Component
 * @namespace Semantic
 * @see https://github.com/mdehoog/Semantic-UI-Calendar
 */
export default Component.extend(Base, {
  layout,

  module: 'calendar',
  classNames: ['ui', 'calendar'],

  /**
   * Name of an icon to display in the input. You can pass `false` to not show an icon.
   *
   * @property icon
   * @type String|Boolean
   * @default 'calendar'
   * @public
   * @see http://semantic-ui.com/elements/icon.html
   */
  icon: 'calendar',

  /**
   * Placeholder for the input.
   *
   * @property placeholder
   * @type String
   * @default ''
   * @public
   */
  placeholder: '',

  getSemanticIgnorableAttrs() {
    return ['icon', 'placeholder'];
  },

  didInitSemantic() {
    this._super(...arguments);

    let date = this.get('date');
    if (date) {
      this.$().calendar('set date', date);
    }
  }
});
