import Ember from 'ember';
import moment from 'moment';

const { Controller, inject } = Ember;

export default Controller.extend({
  moment: inject.service('moment'),

  date: null,

  actions: {
    resetDate() {
      this.set('date', moment());
    },

    changeLocale(locale) {
      this.get('moment').setLocale(locale);
    }
  }
});
