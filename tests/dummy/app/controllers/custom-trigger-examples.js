import Controller from '@ember/controller';

export default Controller.extend({
  date: null,

  actions: {
    onSelectedDate(date) {
      this.set('date', date.toDateString());
    }
  }
});
