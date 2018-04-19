import Controller from '@ember/controller';

export default Controller.extend({
  date: null,

  actions: {
    resetDate() {
      this.set('date', new Date());
    }
  }
});
