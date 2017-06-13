import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  date: null,

  actions: {
    resetDate() {
      this.set('date', new Date());
    }
  }
});
