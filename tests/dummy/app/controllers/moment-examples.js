import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import moment from 'moment';

export default Controller.extend({
  moment: service('moment'),

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
