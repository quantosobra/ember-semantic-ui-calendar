// BEGIN-SNIPPET components-ui-calendar-moment
import Ember from 'ember';
import moment from 'moment';
import UiCalendarComponent from 'ember-semantic-ui-calendar/components/ui-calendar';

const { computed, inject, merge } = Ember;

const UiCalendarMoment = UiCalendarComponent.extend({
  // See below
});

export default UiCalendarMoment;
// END-SNIPPET components-ui-calendar-moment

// BEGIN-SNIPPET components-ui-calendar-moment-binding
UiCalendarMoment.reopen({
  // Store the moment object for the selected date
  momentValue: null,

  // Provide the Date object that is used by ui-calendar
  date: computed('momentValue', function() {
    let momentValue = this.get('momentValue');
    return momentValue ? momentValue.toDate() : null;
  }).readOnly(),

  willInitSemantic(settings) {
    this._super(...arguments);

    merge(settings, {
      onChange(date) {
        // Wraps the Date in a moment object an triggers the onChange action
        this.sendAction('onChange', date ? moment(date) : null);
      }
    });
  }
});
// END-SNIPPET components-ui-calendar-moment-binding

// BEGIN-SNIPPET components-ui-calendar-moment-locale
UiCalendarMoment.reopen({
  moment: inject.service('moment'),

  init() {
    this._super(...arguments);

    this.get('moment').on('localeChanged', () => this.momentLocaleChanged());
  },

  localizedText: computed(function() {
    return {
      days: moment.weekdaysMin(),
      months: moment.months(),
      monthsShort: moment.monthsShort()
      // You can also add translations for `today` and `now` here, using an
      // addon like ember-i18n or ember-intl.
    };
  }).volatile(),

  momentLocaleChanged() {
    // Update translations
    this.execute('setting', 'text', this.get('localizedText'));

    // Refresh the calendar in popup
    this.execute('refresh');

    // Refresh the input
    this.execute('set date', this.get('date'), true, false);
  },

  willInitSemantic(settings) {
    this._super(...arguments);
    merge(settings, {
      text: this.get('localizedText'),
      formatter: {
        date(date) {
          return date ? moment(date).format('L') : '';
        },
        time(date) {
          return date ? moment(date).format('LT') : '';
        }
      }
    });
  }
});
// END-SNIPPET components-ui-calendar-moment-locale
