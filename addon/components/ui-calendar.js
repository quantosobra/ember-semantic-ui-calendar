import Ember from 'ember';
import Base from 'semantic-ui-ember/mixins/base';
import layout from '../templates/components/ui-calendar';

const { Component, computed, isEmpty } = Ember;

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
  ignorableAttrs: ['date', 'icon', 'placeholder'],

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

  /**
   * If the user can clear the value using a clear button inside the input.
   *
   * @property allowClear
   * @type Boolean
   * @default false
   * @public
   */
  allowClear: false,

  /**
   * Name of the icon to use as a button the clear the input value.
   *
   * @property clearIcon
   * @type String
   * @default 'clear'
   * @public
   */
  clearIcon: 'remove',

  /**
   * @property showClearButton
   * @type Boolean
   * @private
   */
  showClearButton: computed('date', 'allowClear', function() {
    let { date, allowClear } = this.getProperties('date', 'allowClear');
    let showClearButton = (allowClear && !isEmpty(date));
    return showClearButton;
  }),

  /**
   * Class names used in .ui.input element to configure icon visibility.
   *
   * @property inputIconsClassNames
   * @type String
   * @private
   */
  inputIconsClassNames: computed('icon', 'showClearButton', function() {
    let { icon, showClearButton } = this.getProperties('icon', 'showClearButton');
    let hasLeftIcon = !isEmpty(icon) && icon !== false;
    let classNames = [];

    if (hasLeftIcon) {
      classNames.push('left');
    }

    if (showClearButton) {
      classNames.push('right');
    }

    if (hasLeftIcon || showClearButton) {
      classNames.push('icon');
    }

    return classNames.join(' ');
  }),

  /**
   * Action executed when the user presses the `enter` key when the input is focused.
   *
   * @event onEnter
   * @param {Event} event
   */
  onEnter: null,

  /**
   * Action executed when the user presses the `escape` key when the input is focused.
   *
   * @event onEscape
   * @param {Event} event
   */
  onEscape: null,

  /**
   * Action executed when the user presses the any key when the input is focused.
   *
   * @event onKeyDown
   * @param {Event} event
   */
  onKeyDown: null,

  didInitSemantic() {
    this._super(...arguments);

    let date = this.get('date');
    if (date) {
      this.$().calendar('set date', date);
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.execute('set date', this.get('date'), true, false);
  },

  actions: {
    onInputKeyDown(value, event) {
      this.sendAction('onKeyDown', event);

      switch (event.keyCode) {
        case 13:
          this.sendAction('onEnter', event);
          break;
        case 27:
          this.sendAction('onEscape', event);
          break;
      }
    }
  }
});
